export interface Client {
    id: number;
    name: string;
    phone: string;
    email?: string;
    notes?: string;
    vehicle: Vehicle;
}

export interface Vehicle {
    id: string;
    make: string;
    model: string;
}
