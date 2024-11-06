import { Component, OnInit, Input } from '@angular/core';
import { Client } from '../../services/models/client.model';
import { ClientService } from '../../services/client.service';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css'],
  standalone: true,
  providers: [ClientService],
  imports: [CommonModule]
})
export class ClientDetailComponent implements OnInit {
  @Input() clientId: number | null = null;

  // Initialize client with a default object to avoid undefined checks
  client: Client = {
    id: 0,
    mobile: '',
    address: '',
    cars: [],
    invoices: []
  };

  constructor(private clientService: ClientService, private location: Location) { }

  ngOnInit(): void {
    if (this.clientId) {
      this.clientService.getClientById(this.clientId).subscribe((data) => {
        this.client = {
          ...this.client,  // Spread the existing default client
          ...data,         // Overwrite with actual data
        };
      });
    }
  }

  goBack(): void {
    this.location.back();  // Navigate back to the previous page
  }
}
