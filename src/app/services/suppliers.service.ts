import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
    providedIn: 'root'
})
export class SupplierService {
    private apiUrl = `${environment.apiUrl}/account-payables`;  // Change to your API endpoint for suppliers

    constructor(private http: HttpClient) { }

    // Method to get all suppliers
    getSuppliers(): Observable<any[]> {
        return this.http.get<any[]>(this.apiUrl);
    }

    // Method to get a single supplier by ID
    getSupplierById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    // Method to create a new supplier
    createSupplier(supplier: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, supplier);
    }

    // Method to update an existing supplier
    updateSupplier(id: string, supplier: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, supplier);
    }

    // Method to delete a supplier by ID
    deleteSupplier(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
