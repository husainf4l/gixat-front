import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
})
export class SignupComponent {
  signupForm: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['EMPLOYEE', [Validators.required]]
    });
  }

  // Method to display specific field error messages
  getErrorMessage(field: string): string {
    const control = this.signupForm.get(field);
    if (control?.hasError('required')) {
      return `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
    }
    if (control?.hasError('pattern')) {
      return 'Please enter a valid mobile number.';
    }
    if (control?.hasError('minlength')) {
      return 'Password must be at least 6 characters long.';
    }
    return '';
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.error = 'Please fill in all required fields with valid data.';
      return;
    }

    const { name, mobile, password, role } = this.signupForm.value;
    this.authService.signup(name, mobile, password, role).subscribe({
      next: () => {
        this.router.navigate(['/app']);  // Navigate to the app page after successful signup
      },
      error: (err) => {
        this.error = err.message;  // Capture the error message from the backend
        // If the error message is about user existence, redirect to login
        if (this.error.includes('User already exists')) {
          this.router.navigate(['/login']);  // Redirect to login page
        }
      }
    });
  }
}
