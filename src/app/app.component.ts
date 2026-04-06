import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Yadao Midterm App Exam';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  showNavbar(): boolean {
    const currentRoute = this.router.url;
    // Hide navbar on login and register pages
    return !currentRoute.includes('/login') && !currentRoute.includes('/register');
  }
}
