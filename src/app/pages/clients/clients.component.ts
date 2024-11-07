import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [MatIconModule, CommonModule, RouterLink],
  templateUrl: './clients.component.html',
})
export class ClientsComponent {

  clients = [
    { id: 1, name: 'John Doe', phone: '123-456-7890', vehicle: { id: "ssss", make: 'Ford bmw', model: "bmw" }, notes: "hee" },
    { id: 2, name: 'Jane Smith', phone: '234-567-8901', vehicle: { id: "ssss", make: 'merc Mustang', model: "bmw" } },
    { id: 3, name: 'Jim Beam', phone: '345-678-9012', vehicle: { id: "ssss", make: 'Kia Mustang', model: "bmw" } }
  ];

}
