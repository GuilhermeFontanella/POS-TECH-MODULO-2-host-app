import { InjectionToken } from "@angular/core";
import { MfePortLoader } from "../mfePortLoader.interface";

export const NAVBAR_LOADER = new InjectionToken<MfePortLoader>(
    'NAVBAR_LOADER'
);