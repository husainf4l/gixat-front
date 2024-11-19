import { Component, EventEmitter, model, OnInit, Output } from '@angular/core';
import { Client } from '../../services/models/client.model';
import { Car, Make, Model, TransmissionType } from '../../services/models/car.model';
import { ClientService } from '../../services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { AddClientDialogComponent } from '../add-client-dialog/add-client-dialog.component';
import { debounceTime, Subject } from 'rxjs';
import { MatAutocompleteModule, MatOption } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { AddCarDialogComponent } from '../add-car-dialog/add-car-dialog.component';
import { CarStatus } from '../../services/models/account.model';
import { CarService } from '../../services/car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autocomplete-fields',
  templateUrl: './autocomplete-fields.component.html',
  styleUrls: ['./autocomplete-fields.component.css'],
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatDialogModule, MatOption],
  standalone: true,
})
export class AutocompleteFieldsComponent implements OnInit {
  @Output() selectedClientChange = new EventEmitter<Client>(); // Emit selected client
  @Output() selectedCarChange = new EventEmitter<Car>(); // Emit selected car



  carDisplayName = '';
  clients: Client[] = [];
  filteredClients: Client[] = [];
  filteredCars: Car[] = [];

  selectedClient: Client = {
    id: '',
    clientName: '',
    phoneNumber: '',
    Car: []
  }


  constructor(
    private clientService: ClientService,  // Inject ClientService
    private dialog: MatDialog) { }

  ngOnInit() {
    this.clientService.getAllClients().subscribe(clients => this.clients = clients);
  };
  onClientSelected(client: Client) {
    this.selectedClient = client

    this.filteredCars = client.Car
    this.selectedClientChange.emit(client);
  }

  filterClients(searchValue: string) {
    this.filteredClients = this.clients.filter(client =>
      `${client.clientName} `.toLowerCase().includes(searchValue.toLowerCase()) || `${client.phoneNumber}`.includes(searchValue)
    );
  }

  filterCars(searchValue: string) {
    this.filteredClients = this.clients.filter(client =>
      `${client.clientName} `.toLowerCase().includes(searchValue.toLowerCase()) || `${client.phoneNumber}`.includes(searchValue)
    );
  }

  onCarSelected(car: Car) {
    this.carDisplayName = `${car.make?.name} ${car.model?.name} (${car.year})`;
    this.selectedCarChange.emit(car);
  }

  addNewClient() {
    const dialogRef = this.dialog.open(AddClientDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newClient) => {
      if (newClient) {
        console.log('New client saved:', newClient);
        this.clients.push(newClient);
        this.filteredClients = this.clients;
        this.onClientSelected(newClient);
        this.selectedClientChange.emit(newClient);

      }
    });
  }


  addNewCar(): void {
    if (this.selectedClient.id == "") {
      console.error('Please select a client before adding a car.');
      return;
    }
    const dialogRef = this.dialog.open(AddCarDialogComponent, {
      width: '800px',
      data: { client: this.selectedClient },

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('New car data from dialog:', result);
        const newCar: any = {
          id: result.id,
          makeId: result.makeId,
          modelId: result.modelId,
          year: result.year,
          model: result.model,
          make: result.make
        };
        this.carDisplayName = `${newCar.make.name} ${newCar.model.name}`
        this.selectedClient.Car.push(newCar);
        this.selectedCarChange.emit(newCar);

      } else {
        console.log('Add car dialog was closed without data.');
      }
    });
  }
  outPut() { }

}
