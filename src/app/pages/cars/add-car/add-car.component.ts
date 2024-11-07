import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Car, Make, Model } from '../../../services/models/car.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, CommonModule, MatAutocompleteModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent {
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
    clientId: ''
  };

  makes: Make[] = [
    { id: '1', name: 'BMW', models: [{ id: 'm1', name: 'X5' }, { id: 'm2', name: 'X3' }, { id: 'm3', name: '3 Series' }]},
    { id: '2', name: 'Mercedes', models: [{ id: 'm1', name: 'C-Class' }, { id: 'm2', name: 'E-Class' }] },
    { id: '3', name: 'Toyota', models: [{ id: 'm1', name: 'Corolla' }, { id: 'm2', name: 'Camry' }] }
  ];

  filteredMakes: Make[] = [...this.makes];
  filteredModels: Model[] = [];

  constructor() {}

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

  addCar() {
    console.log('Car details:', this.car);
  }

  cancel() {

  }
}
