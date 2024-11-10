import { Client } from "./client.model";
import { Supplier } from "./inventory.model";

// Enums for classification and types
export enum AccountClassification {
  ASSET = "ASSET",
  LIABILITY = "LIABILITY",
  EQUITY = "EQUITY",
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE"
}

export enum AccountType {
  CURRENT_ASSET = "CURRENT_ASSET",
  FIXED_ASSET = "FIXED_ASSET",
  CURRENT_LIABILITY = "CURRENT_LIABILITY",
  LONG_TERM_LIABILITY = "LONG_TERM_LIABILITY",
  EQUITY = "EQUITY",
  REVENUE = "REVENUE",
  EXPENSE = "EXPENSE",
  COST_OF_GOODS_SOLD = "COST_OF_GOODS_SOLD",
  OTHER_INCOME = "OTHER_INCOME",
  OTHER_EXPENSE = "OTHER_EXPENSE"
}

export enum PurchaseOrderStatus {
  ORDERED = "ORDERED",
  RECEIVED = "RECEIVED",
  PENDING_PAYMENT = "PENDING_PAYMENT"
}

export enum InvoiceStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  OVERDUE = "OVERDUE"
}

export enum CarStatus {
  CHECKED_IN = "CHECKED_IN",
  DIAGNOSIS = "DIAGNOSIS",
  AWAITING_PARTS = "AWAITING_PARTS",
  IN_SERVICE = "IN_SERVICE",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  CANCELLED = "CANCELLED"
}

export enum EntryType {
  DEBIT = "DEBIT",
  CREDIT = "CREDIT"
}

export enum JobStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export enum ExperienceLevel {
  JUNIOR = "Junior",
  INTERMEDIATE = "Intermediate",
  SENIOR = "Senior"
}

// Interfaces for Models based on Prisma

// Client model (AccountReceivable in Prisma)

// Address model for clients


// ChartOfAccount model for client accounts
export interface ChartOfAccount {
  id: string;
  name: string;
  accountCode: string;
  accountType: AccountType;
  classification: AccountClassification;
  parentAccount?: ChartOfAccount; // Parent account if part of a hierarchy
  subAccounts?: ChartOfAccount[]; // Subaccounts of this chart of account
  transactions?: JournalEntry[]; // Associated journal entries for this account
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

// Journal Entry and Journal Lines
export interface JournalEntry {
  id: string;
  transactionDate: Date;
  description: string;
  journalLines: JournalLine[];
  createdAt: Date;
  updatedAt: Date;
  chartOfAccountId: string;
}

export interface JournalLine {
  id: string;
  entryId: string;
  accountId: string;
  debit: number;
  credit: number;
  createdAt: Date;
  updatedAt: Date;
}

// Car related models


export interface Part {
  id: string;
  name: string;
  quantity: number;
  cost: number;
}

export interface Technician {
  id: string;
  name: string;
  experienceLevel: ExperienceLevel;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  subcategories: Category[];
  items: InventoryItem[];
}

// Invoice related models
export interface Invoice {
  id: string;
  accountId: string;
  amount: number;
  dueDate: Date;
  status: InvoiceStatus;
  createdAt: Date;
  updatedAt: Date;
  account: Client;
}

// Purchase order related models
export interface PurchaseOrder {
  id: string;
  accountId: string;
  amount: number;
  orderDate: Date;
  status: PurchaseOrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

// Inventory Item model
export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  sellingPrice: number;
  status: InventoryStatus;
  category: Category;
  supplier: Supplier;
  reorderLevel: number;
  lastRestocked?: Date;
  location?: string;
  barcode?: string;
  sku?: string;
}

export enum InventoryStatus {
  IN_STOCK = "IN_STOCK",
  OUT_OF_STOCK = "OUT_OF_STOCK",
  LOW_STOCK = "LOW_STOCK"
}



export interface InventoryTransaction {
  id: string;
  inventoryItemId: string;
  inventoryItem: InventoryItem;
  transactionDate: Date;
  transactionType: TransactionType;
  quantityChanged: number;
  newQuantity: number;
  description: string;
}

export enum TransactionType {
  PURCHASE = "PURCHASE",
  SALE = "SALE",
  ADJUSTMENT = "ADJUSTMENT"
}

export interface InventoryTransaction {
  id: string;
  inventoryItemId: string;
  inventoryItem: InventoryItem;
  transactionDate: Date;
  transactionType: TransactionType;
  quantityChanged: number;
  newQuantity: number;
  description: string;
}
