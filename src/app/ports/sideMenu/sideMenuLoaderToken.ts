import { InjectionToken } from "@angular/core";
import { PortLoader } from "../portLoader.interface";

export const SIDE_MENU_LOADER = new InjectionToken<PortLoader>(
    'SIDE_MENU_LOADER'
);