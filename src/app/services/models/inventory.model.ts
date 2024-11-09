export interface Category {
    id: number;
    name: string;
    description?: string;
    parentCategoryId?: number;
}

export interface Account {
    id: number;
    name: string;
    accountCode: string;
    accountType: AccountType;
    contactInfo?: ContactInfo;
    address?: string;
}

export enum AccountType {
    ASSET = "ASSET",
    LIABILITY = "LIABILITY",
    EQUITY = "EQUITY",
    REVENUE = "REVENUE",
    EXPENSE = "EXPENSE",
}

export interface ContactInfo {
    phoneNumber?: string;
    email?: string;
}

export interface Supplier {
    id: number;
    name: string;
    contactInfo?: string; // e.g., phone or email
    address?: string;     // Supplier's address if available
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
    supplier: Supplier; // Updated to reference Supplier
    status: InventoryStatus;
    reorderLevel: number;
    lastRestocked?: Date;
    location?: string;
    barcode?: string;
    sku?: string;
    unitOfMeasure?: string;
    minOrderQuantity?: number;
    batchNumber?: string;
}

export enum InventoryStatus {
    IN_STOCK = "IN_STOCK",
    OUT_OF_STOCK = "OUT_OF_STOCK",
    LOW_STOCK = "LOW_STOCK",
}
