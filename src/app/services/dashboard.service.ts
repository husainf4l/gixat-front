import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
    providedIn: 'root',
})
export class DashboardService {
    private apiUrl = `${environment.apiUrl}/dashboard`;  // Adjust according to your backend API structure

    constructor(private http: HttpClient) { }

    // Fetch key metrics data
    getKeyMetrics(): Observable<any> {
        return this.http.get(`${this.apiUrl}/metrics`);
    }

    // Fetch recent activities
    getRecentActivities(): Observable<any> {
        return this.http.get(`${this.apiUrl}/recent-activities`);
    }

    // Fetch parts awaiting delivery
    getPartsAwaiting(): Observable<any> {
        return this.http.get(`${this.apiUrl}/parts-awaiting`);
    }
}
