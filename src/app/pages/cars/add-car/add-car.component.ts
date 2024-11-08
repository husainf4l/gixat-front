// add-car.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CarCreateInput, Make, Model } from '../../../services/models/car.model';
import { Client } from '../../../services/models/client.model';
import { CarService } from '../../../services/car.service';
import { ClientService } from '../../../services/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, CommonModule, MatAutocompleteModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})

export class AddCarComponent implements OnInit {
  // Properties and constructor remain the same
  car: CarCreateInput = {
    makeId: '',
    modelId: '',
    year: 2020,
    transmissionType: "Automatic",
    notes: '',
    clientId: '',
  };

  clientDisplayName = '';
  makeDisplayName = '';
  modelDisplayName = '';

  makes: Make[] = [];
  clients: Client[] = [];
  filteredModels: Model[] = [];
  filteredMakes: Make[] = [];
  filteredClients: Client[] = [];

  constructor(private carService: CarService, private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
    this.carService.getMakes().subscribe(makes => this.makes = makes);
    this.clientService.getAllClients().subscribe(clients => this.clients = clients);
  }

  // Method for selecting a client
  onClientSelected(client: Client) {
    this.car.clientId = client.id;
    this.clientDisplayName = `${client.firstName} ${client.lastName}`;
  }

  // Method for selecting a make
  onMakeSelected(make: Make) {
    this.car.makeId = make.id;
    this.makeDisplayName = make.name;
    this.filteredModels = make.models; // Set models for the selected make
  }

  // Method for selecting a model
  onModelSelected(model: Model) {
    this.car.modelId = model.id;
    this.modelDisplayName = model.name;
  }

  // Filter method for clients
  filterClients(searchValue: string) {
    this.filteredClients = this.clients.filter(client =>
      `${client.firstName} ${client.lastName}`.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // Filter method for makes
  filterMakes(searchValue: string) {
    this.filteredMakes = this.makes.filter(make =>
      make.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  // Filter method for models
  filterModels(searchValue: string) {
    this.filteredModels = this.filteredModels.filter(model =>
      model.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  addCar() {
    this.carService.createCar(this.car).subscribe({
      next: (response) => {
        console.log('Client successfully added:', response);
        this.router.navigate(['/app']);
      },
      error: (err) => console.error('Error adding car:', err)
    });
  }

  cancel() {
    this.car = {
      makeId: '',
      modelId: '',
      year: 2020,
      transmissionType: "Automatic",
      notes: '',
      clientId: ''
    };
    this.clientDisplayName = '';
    this.makeDisplayName = '';
    this.modelDisplayName = '';
  }
}
