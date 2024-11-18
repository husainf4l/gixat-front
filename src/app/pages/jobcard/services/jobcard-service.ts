import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/environment';
import { AuthService } from '../../../services/auth.service';
import { Client } from '../../../services/models/client.model';

@Injectable({
    providedIn: 'root'
})
export class JobCardService {
    private carUrl = `${environment.apiUrl}/job-cards`;

    constructor(private http: HttpClient, private auth: AuthService) { }

    getClients(): Observable<any[]> {
        return this.http.get<any[]>(`${this.carUrl}/clients`,
            { headers: this.auth.getHeaders() }
        );
    }

    addClient(client: { clientName: string; phoneNumber: string }) {
        return this.http.post<Client>('/api/clients', client);
    }


    getInventoryParts(): Observable<any> {
        return this.http.get(`${this.carUrl}/inventory`);
    }


    createJobCard(jobCardData: any): Observable<any> {
        return this.http.post(`${this.carUrl}`, jobCardData);
    }


    getJobRequests(): Observable<any> {
        return this.http.get(`${this.carUrl}/getJobRequests`);
    }

}