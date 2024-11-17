import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JobCardService } from '../services/jobcard-service';
import { CommonModule } from '@angular/common';
import { Client } from '../../../services/models/client.model';
import { Car } from '../../../services/models/car.model';

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
  parts: any[] = []; // Array of inventory parts
  selectedParts: any[] = []; // Parts selected for the job

  constructor(private fb: FormBuilder, private jobCardService: JobCardService) {
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
  }

  // Fetch clients from the API
  fetchClients() {
    this.jobCardService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        console.error('Error fetching clients:', err);
      }
    });
  }
  fetchInventoryParts() {
    this.jobCardService.getInventoryParts().subscribe({
      next: (data) => {
        this.parts = data;
      },
      error: (err) => {
        console.error('Error fetching parts:', err);
      }
    });
  }


  // Handle client selection to populate cars
  onClientChange(event: Event) {
    const clientId = (event.target as HTMLSelectElement).value;
    const selectedClient = this.clients.find(client => client.id === clientId) || null;
    this.Car = selectedClient ? selectedClient.Car : [];
    this.jobCardForm.patchValue({ carId: '' });
  }

  togglePartSelection(part: any) {
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
        date: new Date().toISOString() // Include the current date as ISO string
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


}
