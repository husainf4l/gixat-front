import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CarService } from '../../services/car.service'; // Use CarService here
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute to capture the route parameter
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true
})
export class CarAddComponent implements OnInit {
  carForm: FormGroup;
  submitted = false;  // To track form submission status
  errorMessage = '';  // To display error messages
  clientId: number | null = null;  // To store clientId from the URL

  constructor(
    private fb: FormBuilder,
    private carService: CarService,
    private route: ActivatedRoute // Inject ActivatedRoute to capture the route parameter
  ) {
    this.carForm = this.fb.group({
      make: ['', [Validators.required]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1900)]],
      vin: ['', [Validators.required]],
      licensePlate: ['', [Validators.required]],
      barcode: ['', [Validators.required]] // Add barcode if it's required by the backend
    });
  }

  ngOnInit(): void {
    // Capture the clientId from the route parameters
    this.route.paramMap.subscribe(params => {
      const clientIdParam = params.get('clientId');
      if (clientIdParam) {
        this.clientId = +clientIdParam;  // Safely parse clientId
        console.log('Client ID:', this.clientId);
      } else {
        console.log('Client ID not found or invalid');
        this.clientId = null; // Handle the case where clientId is missing or invalid
        this.errorMessage = 'Invalid Client ID';
      }
    });
  }



  onSubmit(): void {
    this.submitted = true;

    // Ensure clientId is set before submitting the form
    if (this.carForm.valid && this.clientId) {
      const carData = { ...this.carForm.value, clientId: this.clientId }; // Merge form data with clientId

      this.carService.createCar(carData).subscribe(
        () => {
          console.log('Car added successfully');
          this.carForm.reset();  // Reset the form after successful submission
          this.submitted = false; // Reset the submitted status
        },
        (error) => {
          this.errorMessage = 'Failed to add car. Please try again.';
          console.error('Error adding car:', error);
          this.submitted = false;
        }
      );
    } else {
      this.errorMessage = 'Client ID or form is invalid';
      console.log('Form submission blocked due to invalid clientId or form');
    }
  }
}
