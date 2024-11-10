// src/app/services/client.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
import { Client } from './models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = `${environment.apiUrl}/account-receivable`;  

  constructor(private http: HttpClient) { }

  // Create a new client account (under Accounts Receivable)
  createClient(clientData: any): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/create`, clientData);
  }

  findAllClientAccountsPaginated(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clients/limit?page=${page}&limit=${limit}`);
  }
  // Get all client accounts
  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  // Get a client by ID
  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  // Update client account by ID
  updateClient(id: string, clientData: Partial<Client>): Observable<Client> {
    return this.http.patch<Client>(`${this.apiUrl}/${id}`, clientData);
  }

  // Delete client account by ID
  deleteClient(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/client/${id}`);
  }

  // Get a paginated list of clients
  findAllClientsPaginated(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/limit?page=${page}&limit=${limit}`);
  }

  // Search for clients by name, phone, or email
  searchClients(query: string): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients/search?q=${query}`);
  }
}
