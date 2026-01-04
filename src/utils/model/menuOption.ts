export interface MenuOption {
  id: 'logout' | 'theme' | 'settings';
  label: string;
  icon: string;
  disabled: boolean;
  path: string;
  dark: boolean;
}