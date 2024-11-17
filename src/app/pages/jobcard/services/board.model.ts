import { JobCard } from "../../../services/models/car.model";

export interface Board {
  id: string;
  status: string;
  priority?: number;
  jobCards: JobCard[];
}

export interface Task {
  description?: string;
  label?: 'purple' | 'blue' | 'green' | 'yellow' | 'red' | 'gray';
}
