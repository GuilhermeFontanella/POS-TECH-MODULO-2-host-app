import { Router } from '@angular/router';
import { inject, Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { UserSessionService } from "src/app/interceptors/user-session.service";
import { TopNavbarPort } from "src/app/ports/topnavbar/topNavbarPort";
import { UserDataPort } from "src/app/ports/userData/userDataPort";
import { USER_DATA_PORT } from "src/app/ports/userData/userDataToken";
import { MenuOption } from "src/utils/model/menuOption";

@Injectable()
export class TopNavbarAdapter implements TopNavbarPort {
    private menuOptionsSubject = new BehaviorSubject<MenuOption[]>([
        {label: 'Sair', path: '/login', id: 'logout', icon: 'poweroff', dark: false, disabled: false},
        {label: 'Modo escuro', path: '', id: 'theme', icon: 'bulb', dark: false, disabled: false},
        {label: 'Configurações', path: '/', id: 'settings', icon: 'setting', dark: false, disabled: false}
    ]);
    private userSessionService = inject(UserSessionService);

    constructor(
        @Inject(USER_DATA_PORT) private userData: UserDataPort,
        private router: Router
    ) {}

    getUserName(): string | null {
        return this.userData.getUserName();
    }

    logout(): void {
        this.userSessionService.clearUser();
        this.router.navigate(['/login']);
    }

    toggleTheme(): void {
        console.log('Modo escuro acionado');
    }

    openSettings(): void {
        console.log('Abrir modal settings');
    }

    menuOptions$(): Observable<MenuOption[]> {
        return this.menuOptionsSubject.asObservable();
    }
}