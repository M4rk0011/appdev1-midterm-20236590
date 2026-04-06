import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  onSubmit(): void {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.username, this.password).subscribe({
      next: (result) => {
        if (result.success) {
          // Get the return URL from query params or default to '/tasks'
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/tasks';
          this.router.navigate([returnUrl]);
        } else {
          this.errorMessage = result.message;
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Login failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
