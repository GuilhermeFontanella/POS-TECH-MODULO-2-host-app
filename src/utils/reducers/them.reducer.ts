import { createReducer, on } from '@ngrx/store';
import {
  setMainTheme,
  setSecondaryTheme,
  setTitleColor,
  setTextColor,
  setBackgroundColor,
  reset
} from '../actions/theme.action';

export interface Theme {
    mainTheme: string;
    secondaryTheme: string;
    titleColor: string;
    textColor: string;
    backgroundColor: string;
}

export const defaultState = {
  mainTheme: '#004D61',
  secondaryTheme: '#CBCBCB',
  titleColor: '#000000',
  textColor: '#004D61',
  backgroundColor: '#E4EDE3'
};

export const initialState = {
  mainTheme: '#004D61',
  secondaryTheme: '#CBCBCB',
  titleColor: '#000000',
  textColor: '#004D61',
  backgroundColor: '#E4EDE3'
};

export const themeReducer = createReducer(
  initialState,
  on(setMainTheme, (state, { mainTheme }) => ({ ...state, mainTheme })),
  on(setSecondaryTheme, (state, { secondaryTheme }) => ({ ...state, secondaryTheme })),
  on(setTitleColor, (state, { titleColor }) => ({ ...state, titleColor })),
  on(setTextColor, (state, { textColor }) => ({ ...state, textColor })),
  on(setBackgroundColor, (state, { backgroundColor }) => ({ ...state, backgroundColor })),
  on(reset, () => defaultState)
);
