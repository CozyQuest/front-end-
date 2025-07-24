import { Routes } from '@angular/router';
import { PropertyCheckout } from './components/property-checkout/property-checkout';

export const routes: Routes = [
    {path: 'checkout/:id', component: PropertyCheckout},
];
