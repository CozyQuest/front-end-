import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * CAN ACTIVATE METHOD WITH ROLE CHECKING
   * Checks if user has the required role specified in route data
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRole = route.data['role']; // Get required role from route data
    
    // First check if user is authenticated
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Then check if user has required role
    if (requiredRole && !this.authService.hasRole(requiredRole)) {
      this.router.navigate(['/unauthorized']); // You might want to create this page
      return false;
    }

    return true; // User has required role
  }
}