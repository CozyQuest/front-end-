import { Routes, RouterModule } from '@angular/router';
import { PropertyCheckout } from './components/property-checkout/property-checkout';
import { PropertyList } from './components/properties/property-list/property-list';
import { LoginButton } from './components/Auth Components/login-button/login-button';
import { RegisterButton } from './components/Auth Components/register-button/register-button';
import { EditProfile } from './components/profile/edit-profile/edit-profile';
import { DashboardShell } from './components/dashboard-shell/dashboard-shell';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // Protected route - requires login
  {
    path: 'checkout/:id',
      component: PropertyCheckout,
      canActivate: [AuthGuard, RoleGuard],
      data: { role: ['User','Host'] }
  },

  // Public route
  {
      path: 'rent',
      component: PropertyList,
    },

  // Auth routes
  { path: 'login', component: LoginButton },
  { path: 'register', component: RegisterButton },

  // Protected route - requires login
  {
    path: 'edit-profile',
    component: EditProfile,
    canActivate: [AuthGuard]
  },

  // Protected route - requires login AND Host role
  {
    path: 'dashboard',
    component: DashboardShell,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Admin' }
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home/home').then(m => m.Home),
  },

  // Protected route - requires login AND Host role
  {
    path: 'add-property',
    loadComponent: () => import('./components/add-property/add-property').then(m => m.AddProperty),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['Host',"User"] }
  },

  // Public route
  {
    path: 'properties/:id',
    loadComponent: () => import('./components/properties/property-details/property-details').then(m => m.PropertyDetails)
  },

  // Protected route - requires login
  {
    path: 'profile/:id',
    loadComponent: () => import('./components/profile/profile-details/profile-details').then(m => m.ProfileDetails),
    canActivate: [AuthGuard]
  },
  {
    path: 'test',
    loadComponent: () => import('./test/test').then(m => m.Test)
  }
];
