// src/app/services/account.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
import { Client } from './models/client.model';
import { Account } from './models/inventory.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = `${environment.apiUrl}/accounts`;

  constructor(private http: HttpClient) { }

  findAllClientAccountsPaginated(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clients/limit?page=${page}&limit=${limit}`);
  }

  createClientAccount(accountData: Partial<any>): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/client`, accountData);
  }
  // Create a new account under Accounts Receivable
  createAccount(accountData: Partial<Account>): Observable<Account> {
    return this.http.post<Account>(`${this.apiUrl}/client`, accountData);
  }

  // Retrieve all accounts of type 'Accounts Receivable'
  getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/clients`);
  }

  // Retrieve a paginated list of accounts
  getPaginatedAccounts(page: number = 1, limit: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/clients/limit?page=${page}&limit=${limit}`);
  }

  // Search accounts by query (e.g., name, company)
  searchAccounts(query: string): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/clients/search?q=${query}`);
  }

  // Retrieve a specific account by ID
  getAccountById(id: string): Observable<Account> {
    return this.http.get<Account>(`${this.apiUrl}/client/${id}`);
  }

  // Update a specific account by ID
  updateAccount(id: string, accountData: Partial<Account>): Observable<Account> {
    return this.http.patch<Account>(`${this.apiUrl}/client/${id}`, accountData);
  }

  // Delete an account by ID
  deleteAccount(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/client/${id}`);
  }

  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/client/${id}`);
  }



}
