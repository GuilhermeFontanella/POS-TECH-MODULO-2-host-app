import { Inject, Injectable } from "@angular/core";
import { LOCAL_STORAGE } from "src/app/ports/storage/localStorage.token";
import { UserDataPort } from "src/app/ports/userData/userDataPort";
import { IUser } from "src/utils/model/user-interface";

@Injectable()
export class UserData implements UserDataPort { 
    private userData?: IUser; 
    constructor(@Inject(LOCAL_STORAGE) private storage: Storage) {}

    storeData() {
        this.storage.setItem('userData', JSON.stringify(this.userData));
    }

    getUserStored() {
        const info = this.storage.getItem('userData');
        return info ? JSON.parse(info) : null;
    }

    getUserName() {
        const info = this.getUserStored();
        return info?.name ?? null;
    }
}