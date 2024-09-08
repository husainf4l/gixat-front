import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class ClientAddComponent {
  clientForm: FormGroup;
  submitted = false;  // New flag to track form submission

  constructor(private fb: FormBuilder, private clientService: ClientService) {
    this.clientForm = this.fb.group({
      mobile: ['', [Validators.required]],
      address: [''],
    });
  }

  onSubmit(): void {
    this.submitted = true;  // Set submitted to true when form is submitted
    if (this.clientForm.valid) {
      this.clientService.addClient(this.clientForm.value).subscribe(() => {
        console.log('Client added successfully');
        // Reset form after successful submission if needed
        this.clientForm.reset();
        this.submitted = false;  // Reset the submitted flag if you want to reuse the form
      });
    }
  }
}
