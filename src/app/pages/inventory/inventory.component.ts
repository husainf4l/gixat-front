import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category, InventoryItem } from '../../services/models/inventory.model';
import { InventoryService } from '../../services/inventory.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink]
})
export class InventoryComponent implements OnInit {
  inventory: InventoryItem[] = [];
  newItem: InventoryItem = this.initializeNewItem();
  editItem: InventoryItem | null = null;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.loadInventory();
  }

  private initializeNewItem(): InventoryItem {
    return {
      id: 0,
      name: '',
      quantity: 0,
      sellingPrice: 0,
      cost: 0,
      description: '',
      category: {} as Category,
      unitPrice: 0,
      supplier: {} as any,
      status: 'IN_STOCK',
      reorderLevel: 0,
      lastRestocked: new Date(),
      location: '',
      barcode: '',
      sku: '',
      unitOfMeasure: '',
      minOrderQuantity: 1,
      batchNumber: ''
    };
  }

  loadInventory(): void {
    this.inventoryService.getAllItems().subscribe(items => this.inventory = items);
  }

  addItem(): void {
    if (this.isValidItem(this.newItem)) {
      this.inventoryService.createItem(this.newItem).subscribe(newItem => {
        this.inventory.push(newItem);
        this.resetNewItem();
      });
    }
  }

  deleteItem(id: number): void {
    this.inventoryService.deleteItem(id).subscribe(() => {
      this.inventory = this.inventory.filter(item => item.id !== id);
    });
  }

  startEdit(item: InventoryItem): void {
    this.editItem = { ...item };
  }

  updateItem(): void {
    if (this.editItem) {
      this.inventoryService.updateItem(this.editItem.id, this.editItem).subscribe(updatedItem => {
        const index = this.inventory.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
          this.inventory[index] = updatedItem;
        }
        this.editItem = null;
      });
    }
  }

  cancelEdit(): void {
    this.editItem = null;
  }

  private resetNewItem(): void {
    this.newItem = this.initializeNewItem();
  }

  private isValidItem(item: InventoryItem): boolean {
    return item.name.trim() !== '' && item.quantity > 0;
  }
}
