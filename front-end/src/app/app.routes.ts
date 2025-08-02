import { Routes, RouterModule } from '@angular/router';
import { PropertyCheckout } from './components/property-checkout/property-checkout';
import { PropertyList } from './components/properties/property-list/property-list';
import { Login } from './components/Auth Components/login/login';
import { Register } from './components/Auth Components/register/register';
import { EditProfile } from './components/profile/edit-profile/edit-profile';
import { DashboardShell } from './components/dashboard-shell/dashboard-shell';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { changePassword } from './components/profile/change-pass/change-pass';
import { ForgotPasswordComponent } from './components/Auth Components/forgot-pass/forget-pass';

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
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // Protected route - requires login
  {
    path: 'edit-profile',
    component: EditProfile,
    canActivate: [AuthGuard]
  },
    {
    path: 'change-pass',
    component: changePassword,
    canActivate: [AuthGuard]
  },
      {
    path: 'forget-pass',
    component: ForgotPasswordComponent,
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
    data: { role: 'Host' }
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
