import { Component, Inject } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { ThemePort } from 'src/app/ports/theme/themePort';
import { THEME_PORT_LOADER } from 'src/app/ports/theme/themePortToken';
import { ACTION } from 'src/utils/model/action.type';
import { Theme } from 'src/utils/reducers/them.reducer';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  theme$!: Observable<Theme>;
  mainTheme$!: Observable<string>;
  secondary$!: Observable<string>;
  titleColor$!: Observable<string>;
  textColor$!: Observable<string>;
  background$!: Observable<string>;

  constructor(@Inject(THEME_PORT_LOADER) private themePort: ThemePort) {
    this.theme$ = this.themePort.theme$();
    this.mainTheme$ = this.theme$.pipe(map(t => t.mainTheme));
    this.secondary$ = this.theme$.pipe(map(t => t.secondaryTheme));
    this.titleColor$ = this.theme$.pipe(map(t => t.titleColor));
    this.textColor$ = this.theme$.pipe(map(t => t.textColor));
    this.background$ = this.theme$.pipe(map(t => t.backgroundColor));
  }

  handleChangeThemeAction(type: ACTION, value: any): void {
    switch(type) {
      case 'main': this.themePort.setMainTheme(value); break;
      case 'secondary': this.themePort.setSecondaryTheme(value); break;
      case 'title': this.themePort.setTitleColor(value); break;
      case 'text': this.themePort.setTextColor(value); break;
      case 'background': this.themePort.setBackgroundColor(value); break;
    }
  }

  reset(): void {
    this.themePort.resetTheme();
  }
}
