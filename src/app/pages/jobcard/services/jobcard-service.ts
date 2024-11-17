import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';

@Injectable({
    providedIn: 'root'
})
export class JobCardService {
    private carUrl = `${environment.apiUrl}/job-cards`;

    constructor(private http: HttpClient) { }

    getClients(): Observable<any[]> {
        return this.http.get<any[]>(`${this.carUrl}/clients`);
    }

    getInventoryParts(): Observable<any> {
        return this.http.get(`${this.carUrl}/inventory`);
    }


    createJobCard(jobCardData: any): Observable<any> {
        return this.http.post(`${this.carUrl}`, jobCardData);
    }



}