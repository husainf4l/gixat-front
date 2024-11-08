import { Client } from "./client.model";

export interface CarCreateInput {
  id?: string;
  makeId: string;
  modelId: string;
  year: number;
  transmissionType: "Automatic" | "Manual";
  vin?: string;
  licenseNumber?: string;
  notes?: string;
  clientId: string;
}


export interface Car {
  id: string;
  make: Make;
  makeId: string;
  model: Model;
  modelId: string
  year: number;
  vin?: string;
  licenseNumber?: string;
  transmissionType: TransmissionType;
  clientId: string;
  client?: Client;
  notes?: string;
  history: CarHistory[];
  inspections: Inspection[];
  jobCards: JobCard[];
  status: CarStatus;
}

export enum CarStatus {
  CHECKED_IN = "CHECKED_IN",
  DIAGNOSIS = "DIAGNOSIS",
  AWAITING_PARTS = "AWAITING_PARTS",
  IN_SERVICE = "IN_SERVICE",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  CANCELLED = "CANCELLED",
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
  inspectorName?: string;
}

export interface JobCard {
  id: string;
  date: Date;
  description: string;
  status: JobStatus;
  cost?: number;
  partsUsed?: Part[];
  assignedTechnician?: Technician;
}

export type JobStatus = "Pending" | "In Progress" | "Completed";

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

export type ExperienceLevel = "Junior" | "Intermediate" | "Senior";

export interface Make {
  id: string;
  name: string;
  models: Model[];
}

export interface Model {
  id: string;
  name: string;
}
