import { ChartOfAccount, Invoice } from "./account.model";
import { Car } from "./car.model";
import { Address } from "./shared.model";

export interface Client {
    id: string;
    clientName: string;
    companyName?: string;
    taxId?: string;
    phoneNumber: string;
    email?: string;
    address: Address;
    chartOfAccountId: string;
    chartOfAccount?: ChartOfAccount; // Linking to the Chart of Accounts
    invoices: Invoice[];
    Car: Car[]; // List of cars related to the client
    createdAt?: Date;
    updatedAt?: Date;
    notes: string;
}
