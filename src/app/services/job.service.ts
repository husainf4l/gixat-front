import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
    providedIn: 'root',
})
export class JobService {
    private apiUrl = `${environment.apiUrl}/jobs`;


    constructor(private http: HttpClient) { }

    createJob(clientId: number, job: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}`, { clientId, ...job });
    }
}
