import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../enviroments/environment';

interface AuthResponse {
    access_token: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`
    private tokenSubject = new BehaviorSubject<string | null>(null);
    public token$ = this.tokenSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }

    login(mobile: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { mobile, password }).pipe(
            tap(response => {
                localStorage.setItem('token', response.access_token);
                this.tokenSubject.next(response.access_token);
            }),
            catchError(this.handleError)
        );
    }

    verifyToken(): Observable<boolean> {
        const token = localStorage.getItem('token');
        if (!token) return of(false);

        return this.http.get<boolean>(`${this.apiUrl}/verify-token`, {
            headers: { Authorization: `Bearer ${token}` }
        }).pipe(
            tap(isValid => {
                if (!isValid) {
                    this.logout();
                }
            }),
            catchError(() => {
                this.logout();
                return of(false);
            })
        );
    }

    logout() {
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
        this.router.navigate(['/login']); // Navigate to login or other appropriate route
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('An error occurred while processing your request.'));
    }
}
