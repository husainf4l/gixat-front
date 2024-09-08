import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../enviroments/environment'; // Import environment to get base URL

@Injectable({
    providedIn: 'root',
})
export class CarService {
    private apiUrl = `${environment.apiUrl}/cars`;

    constructor(private http: HttpClient) { }

    // Create a new car and associate it with a client
    createCar(carData: any): Observable<any> {
        return this.http.post(`${this.apiUrl}`, carData); // Post request to create a car
    }

    // Fetch all cars for a specific client
    getCarsByClient(clientId: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/client/${clientId}`);
    }

    // Fetch a car by its ID
    getCarById(carId: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${carId}`);
    }

    // Delete a car by its ID
    deleteCar(carId: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${carId}`);
    }
}
