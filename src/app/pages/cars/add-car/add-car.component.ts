import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Car, Make, Model } from '../../../services/models/car.model';
import { Client } from '../../../services/models/client.model';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, CommonModule, MatAutocompleteModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  car: Car = {
    make: { id: '', name: '', models: [] },
    model: { id: '', name: '' },
    year: '2020',
    transmissionType: "Automatic",
    vin: '',
    licenseNumber: '',
    notes: '',
    history: [],
    inspections: [],
    jobCards: [],
    clientId: '',
    client: {  // Initialize with all required Client properties
      id: '',
      companyName: '',
      taxId: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      country: '',
      city: '',
      streetAddress: '',
      notes: '',
      cars: []
    }
  };

  makes: Make[] = [
    { id: '1', name: 'BMW', models: [{ id: 'm1', name: 'X5' }, { id: 'm2', name: 'X3' }] },
    { id: '2', name: 'Mercedes', models: [{ id: 'm1', name: 'C-Class' }, { id: 'm2', name: 'E-Class' }] },
  ];

  clients: Client[] = [
    { id: 'c1', firstName: 'John', lastName: 'Doe', phone: '123456789', email: 'john@example.com', country: 'USA', city: 'New York', streetAddress: '123 Main St', notes: '', cars: [] },
    { id: 'c2', firstName: 'Jane', lastName: 'Smith', phone: '987654321', email: 'jane@example.com', country: 'Canada', city: 'Toronto', streetAddress: '456 Elm St', notes: '', cars: [] },
    // Additional sample clients as needed
  ];

  filteredMakes: Make[] = [...this.makes];
  filteredModels: Model[] = [];
  filteredClients: Client[] = [...this.clients];

  constructor() {}

  ngOnInit(): void {
    if (this.car.clientId) {
      this.car.client = this.clients.find(client => client.id === this.car.clientId);
    }
  }

  filterMakes() {
    const searchValue = this.car.make.name.toLowerCase();
    this.filteredMakes = this.makes.filter(make => make.name.toLowerCase().includes(searchValue));
  }

  onMakeSelected(make: Make) {
    this.car.make = make;
    this.filteredModels = make.models;
  }

  filterModels() {
    const searchValue = this.car.model.name.toLowerCase();
    this.filteredModels = this.car.make.models.filter(model => model.name.toLowerCase().includes(searchValue));
  }

  filterClients() {
    const searchValue = (this.car.client?.firstName || '').toLowerCase();
    this.filteredClients = this.clients.filter(client =>
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchValue)
    );
  }

  onClientSelected(client: Client) {
    this.car.clientId = client.id;
    this.car.client = client;
  }

  addCar() {
    console.log('Car details:', this.car);
  }

  cancel() {
    this.car = {
      make: { id: '', name: '', models: [] },
      model: { id: '', name: '' },
      year: '2020',
      transmissionType: "Automatic",
      vin: '',
      licenseNumber: '',
      notes: '',
      history: [],
      inspections: [],
      jobCards: [],
      clientId: '',
    };
  }
}
