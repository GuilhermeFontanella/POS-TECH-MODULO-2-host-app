import { InjectionToken } from "@angular/core";
import { UserDataPort } from "./userDataPort";

export const USER_DATA_PORT = new InjectionToken<UserDataPort>('USER_DATA_PORT');