import { Component, OnInit } from '@angular/core';
import { JobCardService } from '../services/jobcard-service';
import { Client } from '../../../services/models/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Car } from '../../../services/models/car.model';
import { AutocompleteFieldsComponent } from "../../../shared/autocomplete-fields/autocomplete-fields.component";

@Component({
  selector: 'app-newjob',
  templateUrl: './newjob.component.html',
  styleUrls: ['./newjob.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatAutocompleteModule, AutocompleteFieldsComponent],
})
export class NewjobComponent implements OnInit {
  clientDisplayName: string = ''; // Input value for client search
  carDisplayName: string = ''; // Input value for car search
  clients: Client[] = []; // Full list of clients fetched from the backend
  filteredClients: Client[] = []; // Filtered clients based on user input
  selectedClient: Client | null = null; // Currently selected client
  filteredCars: Car[] = []; // Filtered cars for the selected client
  selectedCar: Car | null = null; // Currently selected car

  constructor(private jobCardService: JobCardService) { }

  ngOnInit() {
    this.fetchClients();
  }

  // Fetch clients from the backend
  fetchClients() {
    this.jobCardService.getClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.filteredClients = data; // Initialize the filtered list
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      },
    });
  }

  // Filter clients based on input value
  filterClients(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredClients = this.clients.filter((client) =>
      client.clientName.toLowerCase().includes(filterValue)
    );
  }

  // Handle client selection
  onClientSelected(client: Client) {
    this.clientDisplayName = client.clientName; // Update the input with selected client name
    this.selectedClient = client; // Store the selected client
    this.filteredCars = client.Car; // Populate cars for the selected client
    console.log('Selected Client:', client);
  }

  // Filter cars based on input value
  filterCars(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredCars = this.selectedClient?.Car.filter(
      (car) =>
        car.make.name.toLowerCase().includes(filterValue) ||
        car.model.name.toLowerCase().includes(filterValue) ||
        car.year.toString().includes(filterValue)
    ) || [];
  }

  // Handle car selection
  onCarSelected(car: Car) {
    this.carDisplayName = `${car.make.name} ${car.model.name} (${car.year})`; // Update input with car details
    this.selectedCar = car; // Store the selected car
    console.log('Selected Car:', car);
  }
}