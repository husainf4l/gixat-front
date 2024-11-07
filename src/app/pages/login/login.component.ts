import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // Import Router
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  standalone: true
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router // Inject Router
  ) {
    this.loginForm = this.fb.group({
      mobile: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const { mobile, password } = this.loginForm.value;
    this.authService.login(mobile, password).subscribe({
      next: () => this.authService.verifyToken().subscribe(valid => {
        if (valid) {
          // Redirect to the dashboard or home page
          this.router.navigate(['/app']);
        } else {
          this.error = 'Invalid token';
        }
      }),
      error: (err) => this.error = 'Login failed'
    });
  }

}
