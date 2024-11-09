import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car, CarStatus, Make } from './models/car.model';
import { environment } from '../enviroments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private carUrl = `${environment.apiUrl}/cars`;

    constructor(private http: HttpClient) { }

    // Retrieve all makes with their models
    getMakes(): Observable<Make[]> {
        return this.http.get<Make[]>(`${this.carUrl}/makes`);
    }

    // Create a new car
    createCar(car: Car): Observable<Car> {
        return this.http.post<Car>(this.carUrl, car);
    }

    // Fetch cars with pagination
    findAllCarsL(page: number = 1, limit: number = 10): Observable<{ data: Car[]; totalClients: number; currentPage: number; totalPages: number }> {
        return this.http.get<{ data: Car[]; totalClients: number; currentPage: number; totalPages: number }>(`${this.carUrl}/limit?page=${page}&limit=${limit}`);
    }

    // Delete a specific car by ID
    deleteCar(id: string): Observable<void> {
        return this.http.delete<void>(`${this.carUrl}/${id}`);
    }

    // Update the status of a specific car
    updateCarStatus(carId: string, newStatus: CarStatus): Observable<Car> {
        const url = `${this.carUrl}/${carId}/status`;
        return this.http.put<Car>(url, { status: newStatus });
    }
}
