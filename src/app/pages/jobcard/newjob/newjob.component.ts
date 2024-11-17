import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobCardService } from '../services/jobcard-service';
import { CommonModule } from '@angular/common';
import { Client } from '../../../services/models/client.model';
import { Car, JobRequest } from '../../../services/models/car.model';
import { Part } from '../../../services/models/account.model';

@Component({
  selector: 'app-newjob',
  standalone: true,
  templateUrl: './newjob.component.html',
  styleUrls: ['./newjob.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class NewjobComponent implements OnInit {
  jobCardForm: FormGroup;
  clients: Client[] = []; // Array of clients fetched from API
  Car: Car[] = []; // Cars for the selected client
  jobRequests: JobRequest[] = []; // Job requests checklist
  parts: Part[] = []; // Inventory parts
  selectedParts: Part[] = []; //

  constructor(private fb: FormBuilder, private jobCardService: JobCardService) {
    // Initialize the form
    this.jobCardForm = this.fb.group({
      clientId: ['', Validators.required],
      carId: ['', Validators.required],
      description: ['', Validators.required],
      laborCost: [0, [Validators.required, Validators.min(0)]],
      parts: [[]],
      totalCost: [{ value: 0, disabled: true }]
    });
  }

  ngOnInit(): void {
    this.fetchClients();
    this.fetchInventoryParts();
    this.fetchJobRequests();
  }

  fetchClients() {
    this.jobCardService.getClients().subscribe({
      next: (data: Client[]) => {
        this.clients = data;
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
    });
  }

  // Fetch inventory parts from the API
  fetchInventoryParts() {
    this.jobCardService.getInventoryParts().subscribe({
      next: (data: Part[]) => {
        this.parts = data;
      },
      error: (err) => {
        console.error('Error fetching parts:', err);
      }
    });
  }

  // Fetch job requests from previous job cards
  fetchJobRequests() {
    this.jobCardService.getJobRequests().subscribe({
      next: (data: JobRequest[]) => {
        this.jobRequests = data;
      },
      error: (err) => {
        console.error('Error fetching job requests:', err);
      }
    });
  }



  onClientChange(event: Event) {
    const clientId = (event.target as HTMLSelectElement).value;
    const selectedClient = this.clients.find(client => client.id === clientId) || null;

    this.Car = selectedClient ? selectedClient.Car : [];
    this.jobCardForm.patchValue({ carId: '' });
  }

  // Handle part selection
  togglePartSelection(part: Part) {
    const index = this.selectedParts.findIndex(p => p.id === part.id);
    if (index === -1) {
      this.selectedParts.push(part);
    } else {
      this.selectedParts.splice(index, 1);
    }
    this.calculateTotalCost();
  }
  calculateTotalCost() {
    const laborCost = this.jobCardForm.value.laborCost || 0;
    const partsCost = this.selectedParts.reduce((sum, part) => sum + part.sellingPrice, 0);
    this.jobCardForm.patchValue({ totalCost: laborCost + partsCost });
  }

  submitJobCard() {
    if (this.jobCardForm.valid) {
      const jobCardData = {
        ...this.jobCardForm.getRawValue(),
        parts: this.selectedParts.map(part => part.id), // Include selected part IDs
        date: new Date().toISOString() // Add current date
      };

      this.jobCardService.createJobCard(jobCardData).subscribe({
        next: (response) => {
          console.log('Job Card Created Successfully:', response);
          alert('Job card created successfully!');
          this.jobCardForm.reset(); // Reset the form after successful submission
          this.selectedParts = []; // Clear selected parts
        },
        error: (err) => {
          console.error('Error creating job card:', err);
          alert('Failed to create job card. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }

  // Open modal to add a new client (logic to be implemented)
  openAddClientModal() {
    console.log('Open Add Client Modal');
    // Implement modal logic here
  }

  // Open modal to add a new car (logic to be implemented)
  openAddCarModal() {
    console.log('Open Add Car Modal');
    // Implement modal logic here
  }

  // Open modal to add a new job request (logic to be implemented)
  openAddJobRequestModal() {
    console.log('Open Add Job Request Modal');
    // Implement modal logic here
  }

  toggleJobRequest(jobRequest: any) {
    console.log('Toggled Job Request:', jobRequest);
    // Implement your logic to handle toggling job requests
  }

}


