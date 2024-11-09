export interface Category {
    id: number;
    name: string;
    description?: string;       // Optional field to describe the category
    parentCategoryId?: number;  // Optional field for subcategories, if needed
}

export interface Supplier {
    id: number;
    name: string;
    contactInfo?: string;       // Optional: phone, email, etc.
    address?: string;           // Optional: supplier's address
}

export interface InventoryItem {
    id: number;
    name: string;
    quantity: number;
    description: string;
    category: Category;
    unitPrice: number;
    cost: number;
    sellingPrice: number;
    supplier: any;
    status: 'IN_STOCK' | 'OUT_OF_STOCK' | 'LOW_STOCK';
    reorderLevel: number;
    lastRestocked?: Date;
    location?: string;
    barcode?: string;
    sku?: string;
    unitOfMeasure?: string;
    minOrderQuantity?: number;
    batchNumber?: string;
}
