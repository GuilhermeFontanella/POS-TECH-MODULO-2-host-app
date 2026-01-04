import { InjectionToken } from "@angular/core";
import { TopNavbarPort } from "./topNavbarPort";

export const TOP_NAVBAR = new InjectionToken<TopNavbarPort>(
    'TOP_NAVBAR'
);