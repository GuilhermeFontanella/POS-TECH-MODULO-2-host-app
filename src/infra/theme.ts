import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { ThemePort } from "src/app/ports/theme/themePort";
import { reset, setBackgroundColor, setMainTheme, setSecondaryTheme, setTextColor, setTitleColor } from "src/utils/actions/theme.action";
import { Theme } from "src/utils/reducers/them.reducer";

@Injectable()
export class ThemeNgRxAdapter implements ThemePort {

  constructor(private store: Store<{theme: Theme}>) {}

  theme$(): Observable<Theme> {
    return this.store.select('theme');
  }

  setMainTheme(value: string): void {
    this.store.dispatch(setMainTheme({ mainTheme: value }));
  }

  setSecondaryTheme(value: string): void {
    this.store.dispatch(setSecondaryTheme({ secondaryTheme: value }));
  }

  setTitleColor(value: string): void {
    this.store.dispatch(setTitleColor({ titleColor: value }));
  }

  setTextColor(value: string): void {
    this.store.dispatch(setTextColor({ textColor: value }));
  }

  setBackgroundColor(value: string): void {
    this.store.dispatch(setBackgroundColor({ backgroundColor: value }));
  }

  resetTheme(): void {
    this.store.dispatch(reset());
  }
}