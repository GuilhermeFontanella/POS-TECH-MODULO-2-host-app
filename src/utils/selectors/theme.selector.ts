import { createSelector, createFeatureSelector } from '@ngrx/store';

export interface ThemeState {
  mainTheme: string;
  secondaryTheme: string;
  titleColor: string;
  textColor: string;
  backgroundColor: string;
}

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectMainTheme = createSelector(
  selectThemeState,
  (state) => state.mainTheme
);

export const selectSecondaryTheme = createSelector(
  selectThemeState,
  (state) => state.secondaryTheme
);

export const selectTitleColor = createSelector(
  selectThemeState,
  (state) => state.titleColor
);

export const selectTextColor = createSelector(
    selectThemeState,
    (state) => state.textColor
);

export const selectBackgroundColor = createSelector(
    selectThemeState,
    (state) => state.backgroundColor
);