import { of } from 'rxjs';
import { ThemePort } from 'src/app/ports/theme/themePort';

export const themePortMock: jasmine.SpyObj<ThemePort> =
  jasmine.createSpyObj<ThemePort>('ThemePort', [
    'setMainTheme',
    'setSecondaryTheme',
    'setTitleColor',
    'setTextColor',
    'setBackgroundColor',
    'resetTheme',
    'theme$'
  ]);

themePortMock.theme$.and.returnValue(of({
  mainTheme: '#000',
  secondaryTheme: '#fff',
  titleColor: '#111',
  textColor: '#222',
  backgroundColor: '#333'
}));
