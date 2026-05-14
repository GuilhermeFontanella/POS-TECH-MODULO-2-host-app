# Contador de Cliques no Botão da Navbar (new-add-button)

## Visão geral

Esta feature adiciona um botão contador na barra de navegação superior (`TopNavbarComponent`) que registra e exibe em tempo real a quantidade de vezes que o usuário o acionou.

A motivação surgiu da necessidade de dar visibilidade ao usuário sobre o número de interações realizadas, uma vez que cada clique pode gerar custos de infraestrutura para a empresa a partir de um determinado limite. Sem esse feedback visual, o usuário não tinha como acompanhar sua própria utilização.

A solução implementada é intencionalmente simples: um contador local e incremental, sem integrações externas, que persiste apenas durante a sessão ativa do usuário na página.

---

## Como funciona

1. O botão é renderizado na `TopNavbarComponent`, visível em todas as páginas da aplicação.
2. A cada clique do usuário, o método `incrementCount()` é invocado.
3. O método incrementa a variável `clickCount` (inicializada em `0`).
4. O template exibe o valor atualizado diretamente no label do botão, no formato `Nº Cliques: N`.
5. O contador **não possui limite superior** — o botão pode continuar sendo clicado indefinitely após atingir qualquer valor.
6. O estado é **local ao componente** e é resetado ao recarregar a página.

---

## Arquivos modificados

| Arquivo | Status | +/- Linhas | O que mudou |
|---|---|---|---|
| `src/app/ui/top-navbar/top-navbar.component.html` | Modificado | +3 / -0 | Adicionado botão estilizado inline com binding de evento `(click)` e interpolação de `clickCount` |
| `src/app/ui/top-navbar/top-navbar.component.ts` | Modificado | +5 / -0 | Adicionada propriedade `clickCount: number = 0` e método `incrementCount()` |
| `src/app/app-routing.module.ts` | Modificado | +2 / -2 | Guard de autenticação (`authGuard`) comentado nas rotas `home-page` e `**` |
| `scripts/generate-docs.js` | Renomeado | +1 / -1 | Atualizado identificador do modelo da Anthropic de `claude-sonnet-4-20250514` para `claude-sonnet-4-6` |

---

## Decisões técnicas

- **Contador local sem persistência:** a contagem vive apenas no estado do componente Angular (`clickCount`). Não há armazenamento em `localStorage`, banco de dados ou serviço externo. Isso significa que o valor é perdido ao recarregar a página — comportamento aceito no escopo atual.
- **Sem limite de cliques:** o botão não é bloqueado após atingir o limiar de custo. A feature atual serve apenas como indicador visual, sem enforcement de regras de negócio.
- **Estilização inline:** o botão foi estilizado diretamente via atributo `style` no template, sem uso de classes CSS ou design system existente. Isso pode dificultar manutenção futura e foge do padrão de estilo da aplicação.

> ⚠️ **Atenção:** a desativação do `authGuard` nas rotas `home-page` e `**` (via comentário no `app-routing.module.ts`) pode ser um ajuste temporário de desenvolvimento. Recomenda-se revisar esse ponto antes de qualquer deploy em ambiente produtivo.

---

## Dependências

Nenhuma dependência externa foi introduzida por esta feature. Não há:

- Chamadas a APIs externas
- Novas bibliotecas instaladas
- Variáveis de ambiente necessárias

---

## Como testar

1. Acesse a aplicação e navegue até qualquer página que exiba a `TopNavbarComponent`.
2. Localize o botão azul com o label **`Nº Cliques: 0`** na barra de navegação superior.
3. Clique no botão uma vez — o label deve atualizar para **`Nº Cliques: 1`**.
4. Clique mais vezes e verifique que o contador incrementa corretamente a cada interação.
5. Recarregue a página e confirme que o contador retorna para **`Nº Cliques: 0`** (comportamento esperado, sem persistência).

---

## Referências

- PR #10: https://github.com/GuilhermeFontanella/POS-TECH-MODULO-2-host-app/pull/10
- Merge: 2026-05-14T15:17:57Z