import { Routes } from '@angular/router';


export const routes: Routes = [
    {
    path: 'properties/:id',
    loadComponent: () => import('./components/properties/property-details/property-details').then(m => m.PropertyDetails)
  },
];
