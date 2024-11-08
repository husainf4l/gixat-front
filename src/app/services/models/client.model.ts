import { Car } from "./car.model";
import { Address } from "./shared.model";

export interface Client {
  id: string;
  companyName?: string;
  taxId?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: Address;
  notes?: string;
  cars?: Car[];
}
