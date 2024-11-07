import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { AddClientComponent } from '../add-client/add-client.component';



@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  searchQuery = '';
  currentPage = 1;
  totalClients = 100; // Adjust based on actual client count
  pages = [1, 2, 3, 4, 5]; // Mock pagination


  clients = [
    { id: 1, name: 'John Doe', phone: '123-456-7890', vehicle: { id: "ssss", make: 'Ford bmw', model: "bmw" }, notes: "hee" },
    { id: 2, name: 'Jane Smith', phone: '234-567-8901', vehicle: { id: "ssss", make: 'merc Mustang', model: "bmw" } },
    { id: 3, name: 'Jim Beam', phone: '345-678-9012', vehicle: { id: "ssss", make: 'Kia Mustang', model: "bmw" } }
  ];

  onSearch() {
    console.log(this.searchQuery);
    // Implement search functionality here
  }
  constructor() { }



  editClient() {
    // Open edit client modal
  }
  viewClient() {
    // Open client details or preview
  }

  deleteClient() {
    // Confirmation and delete logic
  }
  onEdit() { }
  onPreview() { }
  onDelete() { }

  goToPage(page: number) {
    this.currentPage = page;
    // Logic to load the specific page of clients
  }


}
