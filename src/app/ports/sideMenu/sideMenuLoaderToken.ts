import { InjectionToken } from "@angular/core";
import { MfePortLoader } from "../mfePortLoader.interface";

export const SIDE_MENU_LOADER = new InjectionToken<MfePortLoader>(
    'SIDE_MENU_LOADER'
);