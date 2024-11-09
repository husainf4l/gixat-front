import { Client } from "./client.model";

export interface Address {
    id: string;
    country: string;
    city: string;
    streetAddress: string;
    AccountReceivable: Client[]; // One-to-many relationship with Client
}