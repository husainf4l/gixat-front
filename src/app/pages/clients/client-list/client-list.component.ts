import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AccountService } from '../../../services/account.service';
import { Account } from '../../../services/models/inventory.model';
import { Client } from '../../../services/models/client.model';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  clint: Client[] = [];
  filteredClint:  Client[] = [];
  displayedClints:  Client[] = [];
  searchQuery = '';
  currentPage = 1;
  totalAccounts = 0;
  accountsPerPage = 10;
  pages: number[] = [];
  limit = 10;
  totalPages = 1;

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.loadClientAccounts(this.currentPage); // Load client accounts initially
  }

  loadClientAccounts(page: number) {
    this.clientService.findAllClientAccountsPaginated(page, this.limit).subscribe({
      next: (data) => {
        this.clint = data.data;  // Assume API returns paginated accounts data
        this.filteredClint = [...this.clint]; // Copy data to filtered accounts
        this.totalAccounts = data.totalAccounts;
        this.totalPages = data.totalPages;
        this.currentPage = data.currentPage;
        this.updateDisplayedAccounts();
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching client accounts:', err);
      },
    });
  }

  // Search functionality for clients
  onSearch() {
    const query = this.searchQuery.trim().toLowerCase();
    if (query) {
      this.filteredClint = this.clint.filter(clints =>
        clints.clientName.toLowerCase().includes(query) ||
        clints.phoneNumber?.includes(query) ||
        clints.email?.toLowerCase().includes(query)
      );
    } else {
      this.filteredClint = [...this.clint];
    }
    this.updatePagination();
    this.updateDisplayedAccounts();
  }

  // Update pagination
  updatePagination() {
    const pageCount = Math.ceil(this.filteredClint.length / this.accountsPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  // Update displayed accounts for pagination
  updateDisplayedAccounts() {
    const start = (this.currentPage - 1) * this.accountsPerPage;
    const end = start + this.accountsPerPage;
    this.displayedClints = this.filteredClint.slice(start, end);
  }

  // Go to specific page in pagination
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedAccounts();
    }
  }

  // Edit client account (open edit modal or navigate to edit page)
  editAccount(accountId: string) {
    // Code to open an edit modal or navigate to an edit page
  }

  // View client account details (open modal or navigate to details page)
  viewAccount(accountId: string) {
    // Code to view account details in a modal or navigate to a details page
  }

  // Delete a client account
  deleteAccount(accountId: string) {
    if (confirm('Are you sure you want to delete this client account?')) {
      this.clientService.deleteClient(accountId).subscribe({
        next: () => {
          this.loadClientAccounts(this.currentPage); // Reload accounts after deletion
        },
        error: (err) => {
          console.error('Error deleting client account:', err);
        },
      });
    }
  }
}
