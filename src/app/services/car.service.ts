import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Car, CarCreateInput, CarStatus, Make } from './models/car.model';
import { Client } from './models/client.model';
import { environment } from '../enviroments/environment';

@Injectable({
    providedIn: 'root'
})
export class CarService {
    private carUrl = `${environment.apiUrl}/cars`;

    constructor(private http: HttpClient) { }

    getMakes(): Observable<Make[]> {
        return this.http.get<Make[]>(`${this.carUrl}/makes`);
    }

    createCar(car: CarCreateInput): Observable<Car> {
        return this.http.post<Car>(this.carUrl, car);
    }

    findAllCarsL(page: number = 1, limit: number = 10): Observable<any> {
        return this.http.get<any>(`${this.carUrl}/limit?page=${page}&limit=${limit}`);
    }

    deleteCar(id: string): Observable<void> {
        return this.http.delete<void>(`${this.carUrl}/${id}`);
    }

    updateCarStatus(carId: string, newStatus: CarStatus): Observable<any> {
        const url = `${this.carUrl}/${carId}/status`;
        return this.http.put(url, { status: newStatus });
    }
}
