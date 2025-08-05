import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Theme } from 'ng-zorro-antd/core/config';
import { Observable } from 'rxjs';
import { setBackgroundColor, setMainTheme, setSecondaryTheme, setTextColor, setTitleColor, reset } from 'src/utils/actions/theme.action';
import { ACTION } from 'src/utils/model/action.type';
import { selectBackgroundColor, selectMainTheme, selectSecondaryTheme, selectTextColor, selectTitleColor } from 'src/utils/selectors/theme.selector';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  private theme$!: Observable<Theme>;
  mainTheme$!: Observable<any>;
  titleColor$!: Observable<any>;
  secondary$!: Observable<any>;
  background$!: Observable<any>;
  textColor$!: Observable<any>;

  constructor(
    private store: Store<{theme: Theme}>
  ) {
    this.theme$ = store.select('theme');
    this.mainTheme$ = this.store.select(selectMainTheme);
    this.titleColor$ = this.store.select(selectTitleColor);
    this.secondary$ = this.store.select(selectSecondaryTheme);
    this.titleColor$ = this.store.select(selectTitleColor);
    this.background$ = this.store.select(selectBackgroundColor);
    this.textColor$ = this.store.select(selectTextColor)
    this.teste();
  }

  teste() {
    this.mainTheme$.subscribe({
      next: (value) => console.log(value)
    })
  }

  handleChangeThemeAction(type: ACTION, value: any): void {
    
    switch(type) {
      case 'main':
        return this.store.dispatch(setMainTheme({mainTheme: value}));
      case 'secondary':
        return this.store.dispatch(setSecondaryTheme({secondaryTheme: value}));
      case 'title':
        return this.store.dispatch(setTitleColor({titleColor: value}));
      case 'text':
        return this.store.dispatch(setTextColor({textColor: value}));
      case 'background':
        return this.store.dispatch(setBackgroundColor({backgroundColor: value}));
      default:
        return undefined;
    }
  }

  reset(): void {
    this.store.dispatch(reset());
  }
}
