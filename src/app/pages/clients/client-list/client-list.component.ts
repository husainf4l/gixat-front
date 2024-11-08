import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { ClientService } from '../../../services/client.service';
import { Client } from '../../../services/models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clients: Client[] = [];
  filteredClients: Client[] = [];
  displayedClients: Client[] = [];
  searchQuery = '';
  currentPage = 1;
  totalClients = 0;
  clientsPerPage = 10;
  pages: number[] = [];
  limit = 10;
  totalPages = 1;


  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClients(this.currentPage);
  }

  loadClients(page: number) {
    this.clientService.findAllClientsL(page, this.limit).subscribe({
      next: (data) => {
        this.clients = data.data;
        this.totalClients = data.totalClients;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      },
    });
  }


  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      this.clients = this.clients.filter(client =>
        client.firstName.toLowerCase().includes(query) ||
        client.lastName.toLowerCase().includes(query) ||
        client.phoneNumber.includes(query)
      );
    } else {
      this.loadClients(this.currentPage);
    }
  }



  updatePagination() {
    this.totalClients = this.filteredClients.length;
    const pageCount = Math.ceil(this.totalClients / this.clientsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  updateDisplayedClients() {
    const start = (this.currentPage - 1) * this.clientsPerPage;
    const end = start + this.clientsPerPage;
    this.displayedClients = this.filteredClients.slice(start, end);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.loadClients(page);
    }
  }

  editClient(clientId: string) {
    // Code to open an edit modal or navigate to an edit page
  }

  viewClient(clientId: string) {
    // Code to view client details in a modal or navigate to a details page
  }

  deleteClient(clientId: string) {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(clientId).subscribe({
        next: () => {
          this.loadClients(this.currentPage); // Reload clients after deletion
        },
        error: (err) => {
          console.error('Error deleting client:', err);
        },
      });
    }
  }
}
