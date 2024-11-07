import { Car } from "./car.model";

export interface Client {
  id: string;  // Assuming each client has a unique identifier
  companyName?: string;  // Optional if some clients might not have a company
  taxId?: string;  // Optional if it's not required for every client
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  streetAddress: string;
  notes?: string;  // Optional notes
  cars: Car[];  // Array of cars associated with this client
}
