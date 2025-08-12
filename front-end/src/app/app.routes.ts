import { Routes, RouterModule } from '@angular/router';
import { PropertyCheckout } from './components/property-checkout/property-checkout';
import { PropertyList } from './components/properties/property-list/property-list';
import { Login } from './components/Auth Components/login/login';
import { Register } from './components/Auth Components/register/register';
import { EditProfile } from './components/profile/edit-profile/edit-profile';
import { DashboardShell } from './components/dashboard-shell/dashboard-shell';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { BecomeHostGuard } from './core/guards/become-host.guard';
import { ChangePassword } from './components/profile/change-pass/change-pass';
import { ForgotPasswordComponent } from './components/Auth Components/forgot-pass/forget-pass';
import { PaymentSuccess } from './components/payment-success/payment-success';
import { PaymentCancel } from './components/payment-cancel/payment-cancel';
import { UpdateProperty } from './components/update-properties/update-properties';


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
    path: 'payment-success',
    component: PaymentSuccess,
    canActivate: [AuthGuard, RoleGuard],
      data: { role: ['User','Host'] }
  },
  {
    path: 'payment-cancel',
    component: PaymentCancel ,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['User','Host'] }
  },
    {
    path: 'change-pass',
    component: ChangePassword,
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
    path: 'property/add',
    loadComponent: () => import('./components/add-property/add-property').then(m => m.AddProperty),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: ['Host',"User"] }
  },

  // Public route
  {
    path: 'properties/:id',
    loadComponent: () => import('./components/properties/property-details/property-details').then(m => m.PropertyDetails)
  },

  {
    path: 'public/:id',
    loadComponent: () => import('./components/profile/public-profile/public-profile').then(m => m.PublicProfile),
  },

  // Protected route - requires login
  {
    path: 'profile/:id',
    loadComponent: () => import('./components/profile/profile-details/profile-details').then(m => m.ProfileDetails),
    canActivate: [AuthGuard]
  },
  {
    path: 'contact',
    loadComponent: () => import('./components/contact-us/contact-us').then(m => m.ContactUs)
  },
  {
    path: 'BecomeHost',
    loadComponent: () => import('./components/become-host/become-host').then(m => m.BecomeHost),
    canActivate: [AuthGuard, RoleGuard, BecomeHostGuard],
    data: { role: 'User' }
  },
  {
    path: 'host',
    loadComponent: () => import('./components/host-owned-list/host-owned-list').then(m => m.HostOwnedList),
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Host' }
  },
  {
    path: 'submission-under-review',
    loadComponent: () => import('./components/submission-under-review/submission-under-review').then(m => m.SubmissionUnderReview)
  },
  {
    path: 'properties/edit/:id',
    component: UpdateProperty,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: 'Host' }
  },
  {
    path: 'test',
    loadComponent: () => import('./test/test').then(m => m.Test)
  }
];
