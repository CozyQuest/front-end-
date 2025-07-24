import { Routes } from '@angular/router';
import { PropertyCheckout } from './components/property-checkout/property-checkout';
import { PropertyList } from './components/properties/property-list/property-list';

export const routes: Routes = [
    {path: 'checkout/:id', component: PropertyCheckout},
    {path:'',component:PropertyList}
];
