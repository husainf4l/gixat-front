import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['EMPLOYEE', [Validators.required]] // Default role is 'EMPLOYEE'
    });
  }


  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }

    const { name, mobile, password, role } = this.signupForm.value;
    this.authService.signup(name, mobile, password, role).subscribe({
      next: () => {
        // Navigate to login after successful signup
        this.router.navigate(['/login']);
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
