const fs = require('fs');
const path = require('path');

async function main() {
  const ctx = JSON.parse(fs.readFileSync('pr-context.json', 'utf8'));

  const commitsText = ctx.commits
    .map(c => `- [\`${c.sha}\`] ${c.message}`)
    .join('\n');

  const commentsText = ctx.comments
    .map(c => `**${c.author}:**\n${c.body}`)
    .join('\n\n---\n\n');

  const filesText = ctx.files
    .map(f => {
      let text = `### \`${f.filename}\` — ${f.status} (+${f.additions} / -${f.deletions})`;
      if (f.patch) text += `\n\`\`\`diff\n${f.patch}\n\`\`\``;
      return text;
    })
    .join('\n\n');

  const prompt = `Você é um engenheiro de software sênior responsável por documentar features de um produto.

Com base nas informações abaixo sobre o Pull Request, gere uma documentação técnica clara e objetiva em Markdown.

## Contexto do PR

**Feature:** ${ctx.feature}
**PR #${ctx.pr.number}:** ${ctx.pr.title}
**Merged em:** ${ctx.pr.merged_at}
**Link:** ${ctx.pr.url}

**Descrição do PR:**
${ctx.pr.body || '(sem descrição)'}

**Commits incluídos:**
${commitsText}

**Conversa no PR (perguntas do bot e respostas do dev):**
${commentsText || '(sem comentários registrados)'}

**Arquivos alterados:**
${filesText}

## Instruções de geração

Gere um documento Markdown com as seções abaixo. Use linguagem técnica mas acessível.
Não invente informações que não estejam no contexto. Se uma seção não tiver dados suficientes, escreva "(não informado)".

---

# [título da feature baseado no nome da branch e PR]

## Visão geral
O que essa feature faz e por que foi criada. Máximo 3 parágrafos.

## Como funciona
Fluxo principal em alto nível. Use listas ou sub-seções se ajudar.

## Arquivos modificados
Tabela com colunas: Arquivo | Status | +/- Linhas | O que mudou

## Decisões técnicas
Escolhas de implementação relevantes e tradeoffs considerados.

## Dependências
Libs, APIs externas, variáveis de ambiente necessárias.

## Como testar
Passos numerados para validar que a feature funciona.

## Referências
- PR #${ctx.pr.number}: ${ctx.pr.url}
- Merge: ${ctx.pr.merged_at}`;

  console.log('Chamando Claude API...');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 4096,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Claude API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const docContent = data.content[0].text;

  // Salva o markdown em docs/features/<slug>.md
  const docsDir = path.join('docs', 'features');
  fs.mkdirSync(docsDir, { recursive: true });

  const slug = ctx.feature
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const filename = `${slug}.md`;
  const filepath = path.join(docsDir, filename);
  fs.writeFileSync(filepath, docContent, 'utf8');

  // Salva o nome da feature para o commit message
  fs.writeFileSync('.feature-name', ctx.feature);

  console.log(`Documentação gerada: ${filepath}`);
}

main().catch(err => {
  console.error('Erro ao gerar documentação:', err);
  process.exit(1);
});
