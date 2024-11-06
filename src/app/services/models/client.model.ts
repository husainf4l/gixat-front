export interface Client {
    id: number;
    mobile: string;
    address: string;  
    cars: Car[];     
    invoices: Invoice[]; 
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
