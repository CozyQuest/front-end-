import { Routes,RouterModule } from '@angular/router';
import { PropertyCheckout } from './components/property-checkout/property-checkout';
import { PropertyList } from './components/properties/property-list/property-list';
import { LoginButton } from './components/Auth Components/login-button/login-button';
import { RegisterButton } from './components/Auth Components/register-button/register-button';
import { EditProfile } from './components/profile/edit-profile/edit-profile';
import { DashboardShell } from './components/dashboard-shell/dashboard-shell';
import { Map } from './components/map/map';

export const routes: Routes = [
    { path: 'checkout/:id', component: PropertyCheckout },
    { path: 'rent', component: PropertyList },
    { path: 'login', component: LoginButton },
    { path: 'map', component: Map},
    { path: 'register', component: RegisterButton },
    {path: 'edit-profile', component: EditProfile},
    {path:'dashboard', component: DashboardShell},
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('./components/home/home/home').then(m => m.Home),
    },
    {
        path: 'add-property',
        loadComponent: () => import('./components/add-property/add-property').then(m => m.AddProperty),
    },
    {
    path: 'properties/:id',
    loadComponent: () => import('./components/properties/property-details/property-details').then(m => m.PropertyDetails)
  },
  {
    path: 'profile/:id',
     loadComponent: () => import('./components/profile/profile-details/profile-details').then(m => m.ProfileDetails),
   },
];
