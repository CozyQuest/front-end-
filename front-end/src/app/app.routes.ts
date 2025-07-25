import { Routes } from '@angular/router';
import { PropertyCheckout } from './components/property-checkout/property-checkout';
import { PropertyList } from './components/properties/property-list/property-list';
import { LoginButton } from './components/Auth Components/login-button/login-button';
import { RegisterButton } from './components/Auth Components/register-button/register-button';
import { EditProfile } from './components/profile/edit-profile/edit-profile';

export const routes: Routes = [
    { path: 'checkout/:id', component: PropertyCheckout },
    { path: 'rent', component: PropertyList },
    { path: 'login', component: LoginButton },
    { path: 'register', component: RegisterButton },
    {path: 'edit-profile', component: EditProfile},
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
