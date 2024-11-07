import { Car } from "./car.model";

export interface Client {
    companyName: string;
    taxId: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    country: string;
    city: string;
    streetAddress: string;
    notes: string;
    cars:Car[]
  }

