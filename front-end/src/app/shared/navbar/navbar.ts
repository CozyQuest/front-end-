import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, DecodedToken } from '../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  menuOpen = false;
  dropdownOpen = false;
  
  // These observables will automatically update the UI when auth state changes
  isAuthenticated$: Observable<boolean>;
  currentUser$: Observable<DecodedToken | null>;

  constructor(private authService: AuthService) {
    // Subscribe to the BehaviorSubjects from AuthService
    this.isAuthenticated$ = this.authService.isAuthenticated$;
    this.currentUser$ = this.authService.currentUser$;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if (!this.menuOpen) this.dropdownOpen = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  /**
   * LOGOUT METHOD
   * Called when user clicks logout button
   */
  logout() {
    this.authService.logout();
    // The BehaviorSubjects will automatically update,
    // and the navbar will re-render to show login buttons
  }

  /**
   * CHECK IF USER HAS SPECIFIC ROLE
   * Example of using auth service methods
   */
  isHost(): boolean {
    return this.authService.hasRole('Host');
  }
}
