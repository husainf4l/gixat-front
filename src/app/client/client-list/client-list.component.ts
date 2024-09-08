import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../../models/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css'],
  imports: [CommonModule, FormsModule, RouterLink],
  standalone: true
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  searchQuery: string = '';

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe((data) => {
      // Initialize cars as an empty array if they are undefined
      this.clients = data.map(client => ({
        ...client,
        cars: client.cars ?? [],
      }));
      this.filteredClients = this.clients;
    });
  }


  filterClients(): void {
    this.filteredClients = this.clients.filter(client =>
      client.mobile.includes(this.searchQuery) ||
      client.cars.some(car => car.licensePlate.includes(this.searchQuery)) ||
      client.cars.some(car => car.make.includes(this.searchQuery)) ||
      client.cars.some(car => car.model.includes(this.searchQuery))
    );
  }
}
