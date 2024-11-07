import { Client } from "./client.model";

export interface Car {
  make: Make;
  model: Model;
  year: string;
  vin?: string;
  licenseNumber?: string;
  transmissionType: TransmissionType;
  clientId: string;      // Unique identifier for the associated client
  client?: Client;       // Full client details, populated as needed
  notes?: string;
  history: CarHistory[];
  inspections: Inspection[];
  jobCards: JobCard[];
}

export type TransmissionType = "Automatic" | "Manual";

export interface CarHistory {
  date: Date;
  event: string;
  details?: string;
}

export interface Inspection {
  date: Date;
  odoReading: number;
  color?: string;
  imageUrl?: string;
  notes?: string;
}

export interface JobCard {
  id: string;
  date: Date;
  description: string;
  status: JobStatus;
  cost?: number;
}

export type JobStatus = "Pending" | "In Progress" | "Completed";

export interface Make {
  id: string;
  name: string;
  models: Model[];
}

export interface Model {
  id: string;
  name: string;
}
