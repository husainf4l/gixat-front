import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuickbooksService {
  private apiUrl = `${environment.apiUrl}/quickbooks`;

  constructor(private http: HttpClient) { }

  // Get OAuth token from backend
  getOAuthToken(code: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/callback?code=${code}`);
  }

  // Get company info using access token
  getCompanyInfo(accessToken: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/company-info?accessToken=${accessToken}`);
  }
}
