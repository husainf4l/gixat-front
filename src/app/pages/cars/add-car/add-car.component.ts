import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';  // Import ClientService
import { CarService } from '../../../services/car.service';
import { Car, Make, Model, TransmissionType } from '../../../services/models/car.model';
import { Client } from '../../../services/models/client.model';

@Component({
  selector: 'app-add-car',
  standalone: true,
  imports: [FormsModule, MatAutocompleteModule],
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})

export class AddCarComponent implements OnInit {
  car: any = {
    makeId: '',
    modelId: '',
    year: 2020,
    transmissionType: TransmissionType.AUTOMATIC,
    notes: '',
    clientAccountId: ""
  };

  clientDisplayName = '';
  makeDisplayName = '';
  modelDisplayName = '';

  makes: Make[] = [];
  models: Model[] = [];
  clients: Client[] = []; // Added clients array
  filteredModels: Model[] = [];
  filteredMakes: Make[] = [];
  filteredClients: Client[] = [];

  constructor(
    private carService: CarService,
    private clientService: ClientService,  // Inject ClientService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.carService.getMakes().subscribe(makes => this.makes = makes);
    this.clientService.getAllClients().subscribe(clients => this.clients = clients);  // Fetch all clients
  }

  onClientSelected(client: Client) {
    this.car.clientAccountId = client.id;
    this.clientDisplayName = `${client.clientName} `;
  }

  onMakeSelected(make: Make) {
    this.car.makeId = make.id;
    this.makeDisplayName = make.name;
    this.filteredModels = make.models;
  }

  onModelSelected(model: Model) {
    this.car.modelId = model.id;
    this.modelDisplayName = model.name;
  }

  filterClients(searchValue: string) {
    this.filteredClients = this.clients.filter(client =>
      `${client.clientName} `.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  filterMakes(searchValue: string) {
    this.filteredMakes = this.makes.filter(make =>
      make.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  filterModels(searchValue: string) {
    this.filteredModels = this.filteredModels.filter(model =>
      model.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  addCar() {
    this.carService.createCar(this.car).subscribe({
      next: (response) => {
        console.log('Car successfully added:', response);
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
      clientAccountId: 0
    };
    this.clientDisplayName = '';
    this.makeDisplayName = '';
    this.modelDisplayName = '';
  }
}
