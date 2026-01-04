import { InjectionToken } from "@angular/core";
import { PortLoader } from "../portLoader.interface";

export const NAVBAR_LOADER = new InjectionToken<PortLoader>(
    'NAVBAR_LOADER'
);