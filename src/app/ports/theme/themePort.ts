import { Observable } from "rxjs";
import { Theme } from "src/utils/reducers/them.reducer";

export interface ThemePort {
  setMainTheme(value: string): void;
  setSecondaryTheme(value: string): void;
  setTitleColor(value: string): void;
  setTextColor(value: string): void;
  setBackgroundColor(value: string): void;
  resetTheme(): void;
  theme$(): Observable<Theme>;
}