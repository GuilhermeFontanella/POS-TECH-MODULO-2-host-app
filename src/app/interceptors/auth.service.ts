import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

export interface AuthService {
  isAuthenticated(): boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthServiceImpl implements AuthService {
    constructor(
        private readonly router: Router
    ) {}

    isAuthenticated(): boolean {
        const token = sessionStorage.getItem('user');
        if (!token) {
            this.router.navigate(['/login']);
            return false;
        }

        return true;
    }
}