import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.authService.verifyToken().pipe(
            map(isValid => {
                if (!isValid) {
                    this.router.navigate(['/login']);
                    return false;
                }
                return true;
            }),
            tap(isValid => {
                if (!isValid) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}
