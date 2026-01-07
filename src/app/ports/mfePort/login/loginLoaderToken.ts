import { InjectionToken } from "@angular/core";
import { MfePortLoader } from "../../mfePortLoader.interface";

export const LOGIN_LOADER = new InjectionToken<MfePortLoader>(
    'LOGIN_LOADER'
);