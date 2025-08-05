import {
  Directive,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  inject,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Theme } from 'src/utils/reducers/them.reducer'; // ajuste conforme seu caminho
import { selectThemeState } from 'src/utils/selectors/theme.selector';
import { take } from 'rxjs/operators';

@Directive({
  selector: '[appThemeApplier]',
})
export class ThemeApplierDirective implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private store: Store<{ theme: Theme }>
  ) {}

  ngOnInit(): void {
    const element: HTMLElement = this.el.nativeElement;
    const dataThemeType = element.getAttribute('data-theme');

    if (!dataThemeType) return;

    // pega o estado atual do tema uma única vez
    setTimeout(() => {
      this.store
      .select('theme')
      //.pipe(take(1)) // não precisamos ficar ouvindo
      .subscribe((theme) => {
        let styleValue = '';

        switch (dataThemeType) {
          case 'main-theme':
            styleValue = theme.mainTheme;
            this.renderer.setStyle(element, 'background-color', styleValue);
            break;
          case 'title':
            styleValue = theme.titleColor;
            this.renderer.setStyle(element, 'color', styleValue);
            break;
          case 'text':
            styleValue = theme.textColor;
            element.style.setProperty('color', styleValue, 'important');
            break;
          case 'background':
            styleValue = theme.backgroundColor;
            this.renderer.setStyle(element, 'background-color', styleValue);
            break;
          case 'secondary':
            styleValue = theme.secondaryTheme;
            this.renderer.setStyle(element, 'background-color', styleValue);
            break;
        }
      });
    }, 50);
  }
}
