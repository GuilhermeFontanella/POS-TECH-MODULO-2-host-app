import { Observable } from "rxjs";
import { MenuOption } from "src/utils/model/menuOption";

export interface TopNavbarPort {
    getUserName():string | null;
    logout(): void;
    toggleTheme(): void;
    openSettings(): void;
    menuOptions$(): Observable<MenuOption[]>;
}