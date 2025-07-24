import { Routes } from '@angular/router';

export const routes: Routes = [
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
  }
];
