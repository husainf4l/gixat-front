import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../../models/client.model';

@Injectable({
    providedIn: 'root',
})
export class ClientService {
    private apiUrl = 'http://localhost:3000/clients';


    constructor(private http: HttpClient) { }

    getAllClients(): Observable<Client[]> {
        return this.http.get<Client[]>(this.apiUrl);
    }

    getClientById(id: number): Observable<Client> {
        return this.http.get<Client>(`${this.apiUrl}/${id}`);
    }

    addClient(client: Client): Observable<Client> {
        return this.http.post<Client>(this.apiUrl, client);
    }


}
