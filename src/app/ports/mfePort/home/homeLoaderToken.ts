import { InjectionToken } from "@angular/core";
import { MfePortLoader } from "../../mfePortLoader.interface";

export const HOME_LOADER = new InjectionToken<MfePortLoader>(
    'HOME_LOADER'
);