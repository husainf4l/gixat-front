import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';
import { InventoryItem, Category } from '../../../services/models/inventory.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-inventory-item',
  templateUrl: './add-inventory-item.component.html',
  styleUrls: ['./add-inventory-item.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatAutocompleteModule, ReactiveFormsModule]
})
export class AddInventoryItemComponent implements OnInit {
  newItem: InventoryItem = this.initializeNewItem();
  categories: Category[] = [];
  filteredCategories!: Observable<Category[]>;

  categoryControl = new FormControl();

  constructor(private inventoryService: InventoryService, private router: Router) { }

  ngOnInit(): void {
    this.loadCategories();
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value || ''))
    );
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

  loadCategories(): void {
    this.inventoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  private _filterCategories(value: string): Category[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  addItem(): void {
    if (this.isValidItem(this.newItem)) {
      this.inventoryService.createItem(this.newItem).subscribe(() => {
        this.router.navigate(['/inventory']);
      });
    }
  }

  private isValidItem(item: InventoryItem): boolean {
    return item.name.trim() !== '' && item.quantity > 0;
  }

  cancel(): void {
    this.router.navigate(['/inventory']);
  }

  onCategorySelected(selectedCategory: Category): void {
    this.newItem.category = selectedCategory;
  }
}
