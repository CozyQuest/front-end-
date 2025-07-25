import { Routes } from '@angular/router';


export const routes: Routes = [
    {
    path: 'properties/details/:id',
    loadComponent: () => import('./components/properties/property-details/property-details').then(m => m.PropertyDetails)
  },
  {
    path: 'profile/details/:id',
    loadComponent: () => import('./components/profile/profile-details/profile-details').then(m => m.ProfileDetails)
  },
];
