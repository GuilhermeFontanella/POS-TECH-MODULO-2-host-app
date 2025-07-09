import { IUser } from "./model/user-interface";

export class UserDataHandler {
    constructor(private userData?: IUser) {}

    storeData() {
        localStorage.setItem('userData', JSON.stringify(this.userData));
    }

    getUserStored() {
        const info = localStorage.getItem('userData');
        return info ? JSON.parse(info) : null;
    }

    getUserName() {
        const info = localStorage.getItem('userData');
        if (info) {
            const userInfo: IUser = JSON.parse(info);
            return userInfo.name;
        } else {
            return null;
        }
    }
}