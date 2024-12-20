import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../enviroments/environment';
import { DashboardService } from './dashboard.service';

interface AuthResponse {
    access_token: string;
    user_id: string;
    companyId: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = `${environment.apiUrl}/auth`;
    private tokenSubject = new BehaviorSubject<string | null>(null);
    public token$ = this.tokenSubject.asObservable();

    constructor(private http: HttpClient, private router: Router) { }
   
    public getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
      }
    
    // Login method to authenticate the user
    login(mobile: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { mobile, password }).pipe(
            tap(response => {
                localStorage.setItem('token', response.access_token);
                localStorage.setItem('userId', response.user_id);
                localStorage.setItem('companyId', response.companyId);
                this.tokenSubject.next(response.access_token);
            }),
            catchError(this.handleError)
        );
    }

    // Verify if the token is valid
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

    // Logout method
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('companyId');
        localStorage.removeItem('userId');

        this.tokenSubject.next(null);
        this.router.navigate(['/login']); // Redirect to login or another appropriate route
    }

    // Signup method, after signup, auto-login the user
    signup(name: string, mobile: string, password: string, role: 'EMPLOYEE' | 'ADMIN'): Observable<any> {
        return this.http.post(`${this.apiUrl}/signup`, { name, mobile, password, role }).pipe(
            tap((response: any) => {
                // After signup, automatically log the user in
                const { access_token, user_id } = response;
                localStorage.setItem('token', access_token);
                localStorage.setItem('user_id', user_id);

                this.tokenSubject.next(access_token);

                // Redirect the user to the app or dashboard after successful signup and login
                this.router.navigate(['/app']);
            }),
            catchError((error) => {
                const errorMessage = error?.error?.message || 'An error occurred while processing your request.';
                return throwError(() => new Error(errorMessage));  // Ensure the error message is passed to the component
            })
        );
    }

    // Handle errors that occur during the HTTP requests
    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('An error occurred while processing your request.'));
    }
}
