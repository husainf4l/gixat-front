import { Part, Technician } from "./account.model";
import { Client } from "./client.model";

export enum CarStatus {
  CHECKED_IN = "CHECKED_IN",
  DIAGNOSIS = "DIAGNOSIS",
  AWAITING_PARTS = "AWAITING_PARTS",
  IN_SERVICE = "IN_SERVICE",
  READY_FOR_PICKUP = "READY_FOR_PICKUP",
  PICKED_UP = "PICKED_UP",
  CANCELLED = "CANCELLED"
}

export enum TransmissionType {
  AUTOMATIC = "AUTOMATIC",
  MANUAL = "MANUAL"
}


export interface Car {
  id: string;
  makeId: string;
  modelId: string;
  year: number;
  vin?: string;
  licenseNumber?: string;
  status: CarStatus;
  transmissionType: TransmissionType;
  clientAccountId: string;
  clientAccount?: Client; // Link to Client Account
  make?: Make; // Car Make
  model?: Model; // Car Model
  notes?: string;
  history?: CarHistory[];
  inspections?: Inspection[];
  jobCards?: JobCard[];
}


export interface Make {
  id: string;
  name: string;
  models: Model[];
  cars: Car[];
}

export interface Model {
  id: string;
  name: string;
  makeId: string;
  make?: Make;
  cars: Car[];
}

export interface CarHistory {
  id: string;
  carId: string;
  date: Date;
  event: string;
  details?: string;
}



export interface Inspection {
  id: string;
  carId: string;
  date: Date;
  odoReading: number;
  color?: string;
  imageUrl?: string;
  notes?: string;
  inspectorName?: string;
}

export interface JobCard {
  id: string;
  carId: string;
  car: Car
  date: Date;
  description: string;
  Board?: BoardStatus;
  boardId?: String;
  cost?: number;
  partsUsed: Part[];
  assignedTechnician: Technician;
  journalEntryId?: string;
  JobRequest: JobRequest[]
}

export interface JobRequest {
  id: string,
  description: string,
  estimatedCost: number,
  isChecked: boolean
}
export interface BoardStatus {
  id: string,

}