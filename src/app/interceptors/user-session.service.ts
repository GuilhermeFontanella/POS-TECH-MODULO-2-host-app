import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class UserSessionService {
  private userSubject = new BehaviorSubject<any | null>(this.getUserFromStorage());
  user$ = this.userSubject.asObservable();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'user') {
        const user = event.newValue ? JSON.parse(event.newValue) : null;
        this.userSubject.next(user);
      }
    });
  }

  private getUserFromStorage(): any | null {
    const json = sessionStorage.getItem('user');
    return json ? JSON.parse(json) : null;
  }

  initFromStorage() {
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  setUser(user: any) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);
  }

  clearUser() {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUser(): any | null {
    return this.userSubject.value;
  }
}
