import { Component } from '@angular/core';
import { Client } from '../../../services/models/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClientService } from '../../../services/client.service';



@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent {


  client: Client = {
    companyName: '',
    taxId: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    notes: '',
    id: '',
    address: { country: '', city: '', streetAddress: '' }

  };



  constructor(private clientService: ClientService, private router: Router) { }

  addClient() {
    const clientData = {
      companyName: this.client.companyName,
      taxId: this.client.taxId,
      firstName: this.client.firstName,
      lastName: this.client.lastName,
      phoneNumber: this.client.phoneNumber,
      email: this.client.email,
      notes: this.client.notes,
      id: '',
      address: {
        create: {
          country: this.client.address.country,
          city: this.client.address.city,
          streetAddress: this.client.address.streetAddress
        }
      }
    };

    // Send the data to the service for the backend request
    this.clientService.createClient(clientData).subscribe({
      next: (response) => {
        console.log('Client successfully added:', response);
        this.router.navigate(['/app']);
      },
      error: (err) => {
        console.error('Error adding client:', err);
      }
    });
  }



}
