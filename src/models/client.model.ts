export interface Client {
    id: number;
    mobile: string;
    address: string;  // Initialize with an empty string if optional
    cars: Car[];      // Initialize as an empty array
    invoices: Invoice[]; // Initialize as an empty array
}

export interface Car {
    make: string;
    model: string;
    year: number;
    vin: string;
    licensePlate: string;
}

export interface Invoice {
    amount: number;
    status: string;
    issuedAt: string;
    dueDate: string;
}
