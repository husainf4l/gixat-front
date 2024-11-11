import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuickbooksService {
  private apiUrl = `${environment.apiUrl}/quickbooks`;  // Adjust the API URL based on your backend's address

  constructor(private http: HttpClient) { }

  // Generate the OAuth URL for QuickBooks authentication
  getOAuthUrl(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/auth/url`);
  }

  handleOAuthCallback(code: string, realmId: string, companyId: string,): Observable<any> {
    const params = new HttpParams()
      .set('code', code)
      .set('companyId', companyId)
      .set('realmId', realmId);


    return this.http.get<any>(`${this.apiUrl}/auth/callback`, { params }).pipe(
      catchError(error => {
        console.error('Error during OAuth callback', error);
        return of({ error: error.message });
      })
    );
  }


  // Fetch company information using the access token
  getCompanyInfo(accessToken: string, realmId: string): Observable<any> {
    const params = new HttpParams()
      .set('accessToken', accessToken)
      .set('realmId', realmId);

    return this.http.get<any>(`${this.apiUrl}/company-info`, { params });
  }

  getInvoices(accessToken: string, realmId: string): Observable<any> {
    const params = new HttpParams()
      .set('accessToken', accessToken)
      .set('realmId', realmId);

    return this.http.get<any>(`${this.apiUrl}/invoices`, { params });
  }

}
