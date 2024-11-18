import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../../services/models/client.model';
import { Car } from '../../services/models/car.model';
import { ClientService } from '../../services/client.service';
import { debounceTime, Subject } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-autocomplete-fields',
  templateUrl: './autocomplete-fields.component.html',
  styleUrls: ['./autocomplete-fields.component.css'],
  imports: [CommonModule, FormsModule, MatAutocompleteModule],
  standalone: true
})
export class AutocompleteFieldsComponent implements OnInit {
  @Output() selectedClientChange = new EventEmitter<Client>(); // Emit selected client
  @Output() selectedCarChange = new EventEmitter<Car>(); // Emit selected car

  clients: Client[] = []; // Clients fetched from the database
  filteredClients: Client[] = []; // Filtered clients
  filteredCars: Car[] = []; // Filtered cars
  selectedClient: Client | null = null; // Currently selected client
  clientDisplayName: string = ''; // Client search input
  carDisplayName: string = ''; // Car search input
  private filterClientsSubject = new Subject<string>(); // Subject for client filtering
  private filterCarsSubject = new Subject<string>(); // Subject for car filtering

  constructor(private clientService: ClientService) { }

  ngOnInit() {
    this.fetchClients();

    // Set up debounced filtering for clients
    this.filterClientsSubject.pipe(debounceTime(300)).subscribe((value) => {
      this.filterClients(value);
    });

    // Set up debounced filtering for cars
    this.filterCarsSubject.pipe(debounceTime(300)).subscribe((value) => {
      this.filterCars(value);
    });
  }

  // Fetch clients from the backend
  fetchClients() {
    this.clientService.getAllClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
        this.filteredClients = data; // Initialize the filtered list
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
        // Show a user-friendly error message if needed
      },
    });
  }

  // Filter clients based on input
  onClientInput(value: string) {
    this.filterClientsSubject.next(value); // Debounced filtering
  }

  // Filter clients logic
  filterClients(value: string) {
    const filterValue = value.toLowerCase();
    this.filteredClients = this.clients.filter((client) =>
      client.clientName.toLowerCase().includes(filterValue)
    );
  }

  // Handle client selection
  onClientSelected(client: Client) {
    this.clientDisplayName = client.clientName;
    this.selectedClient = client;
    this.filteredCars = client.Car || []; // Populate cars for the selected client
    this.selectedClientChange.emit(client); // Emit selected client to parent
  }

  // Filter cars based on input
  onCarInput(value: string) {
    this.filterCarsSubject.next(value); // Debounced filtering
  }

  // Filter cars logic
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
    this.carDisplayName = `${car.make.name} ${car.model.name} (${car.year})`;
    this.selectedCarChange.emit(car); // Emit selected car to parent
  }
}