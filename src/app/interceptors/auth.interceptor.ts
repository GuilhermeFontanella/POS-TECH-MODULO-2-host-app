import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserSessionService } from './user-session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor (private session: UserSessionService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const user = this.session.getUser();
        if (user && user.token) {
            req = req.clone({
                setHeaders: { Authorization: `Bearer ${user.token}` }
            });
        }
        return next.handle(req);
    }
}
