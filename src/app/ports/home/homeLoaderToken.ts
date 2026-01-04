import { InjectionToken } from "@angular/core";
import { PortLoader } from "../portLoader.interface";

export const HOME_LOADER = new InjectionToken<PortLoader>(
    'HOME_LOADER'
);