import { createAction, props } from '@ngrx/store';

export const setMainTheme = createAction(
  '[Theme] Set Main Theme',
  props<{ mainTheme: string }>()
);

export const setSecondaryTheme = createAction(
  '[Theme] Set Secondary Theme',
  props<{ secondaryTheme: string }>()
);

export const setTitleColor = createAction(
  '[Theme] Set Title Color',
  props<{ titleColor: string }>()
);

export const setTextColor = createAction(
  '[Theme] Set Text Color',
  props<{ textColor: string }>()
);

export const setBackgroundColor = createAction(
  '[Theme] Set Background Color',
  props<{ backgroundColor: string }>()
);

export const reset = createAction('[Theme] Reset');
