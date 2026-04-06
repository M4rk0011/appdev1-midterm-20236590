import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly isAuthenticatedSignal = signal<boolean>(false);
  private readonly currentUserSignal = signal<User | null>(null);
  private readonly usersKey = 'registered_users';

  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  readonly currentUser = this.currentUserSignal.asReadonly();

  constructor(private router: Router) {
    this.initializeDefaultAdmin();
    this.loadUserFromStorage();
  }

  private initializeDefaultAdmin(): void {
    const users = this.getUsers();
    
    // Check if admin user already exists
    const adminExists = users.some(user => user.username === 'admin');
    
    if (!adminExists) {
      const adminUser: User = {
        id: crypto.randomUUID(),
        username: 'admin',
        email: 'admin',
        password: 'admin',
        createdAt: new Date().toISOString()
      };
      
      users.push(adminUser);
      this.saveUsers(users);
    }
  }

  private loadUserFromStorage(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        this.currentUserSignal.set(user);
        this.isAuthenticatedSignal.set(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }

  private getUsers(): User[] {
    const storedUsers = localStorage.getItem(this.usersKey);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }

  register(username: string, email: string, password: string): Observable<{ success: boolean; message: string }> {
    const users = this.getUsers();
    
    // Check if username already exists
    if (users.some(user => user.username === username)) {
      return of({ success: false, message: 'Username already exists' });
    }
    
    // Check if email already exists
    if (users.some(user => user.email === email)) {
      return of({ success: false, message: 'Email already registered' });
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      username,
      email,
      password, // In real app, this should be hashed
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    this.saveUsers(users);

    // Auto-login after registration
    this.currentUserSignal.set(newUser);
    this.isAuthenticatedSignal.set(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return of({ success: true, message: 'Account created successfully' });
  }

  login(username: string, password: string): Observable<{ success: boolean; message: string }> {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
      this.currentUserSignal.set(user);
      this.isAuthenticatedSignal.set(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return of({ success: true, message: 'Login successful' });
    } else {
      return of({ success: false, message: 'Invalid username or password' });
    }
  }

  logout(): void {
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticatedSignal();
  }

  getUsername(): string | null {
    const user = this.getCurrentUser();
    return user ? user.username : null;
  }

  getEmail(): string | null {
    const user = this.getCurrentUser();
    return user ? user.email : null;
  }
}
