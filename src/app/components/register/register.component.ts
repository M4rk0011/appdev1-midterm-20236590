import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    // Basic validation
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      this.isLoading = false;
      return;
    }

    if (this.username.length < 3) {
      this.errorMessage = 'Username must be at least 3 characters';
      this.isLoading = false;
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters';
      this.isLoading = false;
      return;
    }

    if (!this.email || !this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address';
      this.isLoading = false;
      return;
    }

    // Register the user
    this.authService.register(this.username, this.email, this.password).subscribe({
      next: (result) => {
        if (result.success) {
          this.successMessage = result.message;
          // Redirect to tasks after successful registration
          setTimeout(() => {
            this.router.navigate(['/tasks']);
          }, 1500);
        } else {
          this.errorMessage = result.message;
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Registration failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
