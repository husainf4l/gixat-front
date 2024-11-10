import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InventoryService } from '../../../services/inventory.service';
import { Category, InventoryItem, InventoryStatus, Supplier } from '../../../services/models/inventory.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CategoryService } from '../../../services/category.service';
import { SupplierService } from '../../../services/suppliers.service';

@Component({
  selector: 'app-add-inventory-item',
  templateUrl: './add-inventory-item.component.html',
  styleUrls: ['./add-inventory-item.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule]
})
export class AddInventoryItemComponent implements OnInit {
  newItem: InventoryItem = this.initializeNewItem();
  categories: Category[] = [];
  suppliers: Supplier[] = [];

  filteredCategories!: Observable<Category[]>;
  filteredSuppliers!: Observable<Supplier[]>;

  categoryControl = new FormControl();
  supplierControl = new FormControl();

  selectedCategoryName: string = '';
  selectedSupplierName: string = '';

  constructor(
    private inventoryService: InventoryService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
    this.loadSuppliers();
    this.filteredCategories = this.categoryControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCategories(value || ''))
    );
    this.filteredSuppliers = this.supplierControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSuppliers(value || ''))
    );
  }

  private initializeNewItem(): any {
    return {
      name: '',
      quantity: 0,
      sellingPrice: 0,
      cost: 0,
      description: '',
      categoryId: '',
      unitPrice: 0,
      supplierAccount: {} as Supplier,
      reorderLevel: 0,
      status: InventoryStatus.OUT_OF_STOCK,  // Use the enum here
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
    this.categoryService.getCategories().subscribe(categories => {
      // Filter categories to show only subcategories
      this.categories = categories.filter(category => category.parentCategoryId);
    });
  }

  loadSuppliers(): void {
    this.supplierService.getSuppliers().subscribe(suppliers => {
      this.suppliers = suppliers;
    });
  }

  private _filterCategories(value: string): Category[] {
    const filterValue = value.toLowerCase();
    return this.categories.filter(category =>
      category.name.toLowerCase().includes(filterValue)
    );
  }

  private _filterSuppliers(value: string): Supplier[] {
    const filterValue = value.toLowerCase();
    return this.suppliers.filter(supplier =>
      supplier.supplierName.toLowerCase().includes(filterValue)
    );
  }

  addItem(): void {
    if (this.isValidItem(this.newItem)) {
      const itemData = {
        name: this.newItem.name,
        quantity: this.newItem.quantity,
        unitPrice: this.newItem.unitPrice,
        cost: this.newItem.cost,
        sellingPrice: this.newItem.sellingPrice,
        status: this.newItem.status,
        reorderLevel: this.newItem.reorderLevel,
        description: this.newItem.description,

        category: {
          connect: {
            id: this.newItem.category.id
          }
        },
        supplierAccount: {
          connect: {
            id: this.newItem.supplierAccount.id
          }
        },
        sku: this.newItem.sku,
        location: this.newItem.location,
        barcode: this.newItem.barcode,
        unitOfMeasure: this.newItem.unitOfMeasure,
        minOrderQuantity: this.newItem.minOrderQuantity,
        batchNumber: this.newItem.batchNumber
      };


      this.inventoryService.createItem(itemData).subscribe(() => {
        this.router.navigate(['app/inventory']);
      });
    }
  }

  private isValidItem(item: InventoryItem): boolean {
    return item.name.trim() !== '' && item.quantity > 0;
  }

  cancel(): void {
    this.router.navigate(['app/inventory']);
  }

  onCategorySelected(selectedCategory: Category): void {
    this.newItem.category = selectedCategory;
    this.selectedCategoryName = this.displayCategory(selectedCategory);

  }

  onSupplierSelected(selectedSupplier: Supplier): void {
    this.newItem.supplierAccount = selectedSupplier;
    this.selectedSupplierName = selectedSupplier.supplierName
  }

  // Function to display category name with parent category information
  displayCategory(category: Category): string {
    return category ? `${category.name} (Main: ${category.parentCategory?.name || 'None'})` : '';
  }

  // Function to display supplier name
  displaySupplier(supplier: Supplier): string {
    return supplier ? supplier.supplierName : '';
  }
}
