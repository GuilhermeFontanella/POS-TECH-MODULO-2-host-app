import { InjectionToken } from "@angular/core";
import { ThemePort } from "./themePort";

export const THEME_PORT_LOADER = new InjectionToken<ThemePort>(
    'THEME_PORT_LOADER'
);