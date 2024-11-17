import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../../../services/account.service';
import { Client } from '../../../services/models/client.model';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent {
  client: Client = {
    companyName: '',
    clientName: '',
    taxId: '',
    phoneNumber: '',
    email: '',
    notes: '',
    id: "0",
    address: {
      country: '',
      city: '',
      streetAddress: '',
      id: '',
      AccountReceivable: []  // This can be left empty initially
    },
    chartOfAccountId: '',
    invoices: [],
    Car: [],
  };

  constructor(private clientService: ClientService, private router: Router) { }

  addClient() {
    const clientData = {
      clientName: this.client.clientName,
      companyName: this.client.companyName,
      taxId: this.client.taxId,
      phoneNumber: this.client.phoneNumber,
      email: this.client.email,
      notes: this.client.notes,
      address: {

        country: this.client.address.country,
        city: this.client.address.city,
        streetAddress: this.client.address.streetAddress

      }
    };
    // Call the service to create an Account Receivable (Client)
    this.clientService.createClient(clientData).subscribe({
      next: (response) => {
        console.log('Client successfully added:', response);
        this.router.navigate(['app/clients']); // Redirect to clients list after successful addition
      },
      error: (err) => {
        console.error('Error adding client:', err);
      }
    });
  }
}
