import { Component } from '@angular/core';
import { Client } from '../../../services/models/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';



@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css'
})
export class AddClientComponent {

  constructor(private router:Router){}

  client: Client = {
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
  };

  addClient() {
    console.log('Client Data:', this.client); 
    this.router.navigate(['/app'])
  }
}
