import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { InventoryService } from '../../services/inventory.service';
import { InventoryItem } from '../../services/models/inventory.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [MatIconModule, MatMenuModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent implements OnInit {
  inventory: InventoryItem[] = [];
  filteredInventory: InventoryItem[] = [];
  displayedInventory: InventoryItem[] = [];
  searchQuery = '';
  currentPage = 1;
  totalInventory = 0;
  inventoryPerPage = 10;
  pages: number[] = [];
  totalPages = 1;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadInventoryItems(this.currentPage); // Load inventory items initially
  }

  loadInventoryItems(page: number) {
    this.inventoryService.searchInventory(this.searchQuery).subscribe({
      next: (data) => {
        this.inventory = data;  // Assuming API returns the inventory data
        this.filteredInventory = [...this.inventory]; // Copy data to filtered inventory
        this.totalInventory = this.filteredInventory.length;
        this.totalPages = Math.ceil(this.totalInventory / this.inventoryPerPage);
        this.updateDisplayedInventory();
        this.updatePagination();
      },
      error: (err) => {
        console.error('Error fetching inventory items:', err);
      },
    });
  }

  // Search functionality for inventory items
  onSearch() {
    this.loadInventoryItems(this.currentPage); // Reload the inventory when search query changes
  }

  // Update pagination
  updatePagination() {
    const pageCount = Math.ceil(this.filteredInventory.length / this.inventoryPerPage);
    this.pages = Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  // Update displayed inventory for pagination
  updateDisplayedInventory() {
    const start = (this.currentPage - 1) * this.inventoryPerPage;
    const end = start + this.inventoryPerPage;
    this.displayedInventory = this.filteredInventory.slice(start, end);
  }

  // Go to specific page in pagination
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedInventory();
    }
  }

  // Edit inventory item
  editItem(itemId: string) {
    // Logic to edit item
  }

  // Delete inventory item
  deleteItem(itemId: string) {
    if (confirm('Are you sure you want to delete this inventory item?')) {
      // Logic to delete item
      console.log(`Item ${itemId} deleted`);
    }
  }
}
