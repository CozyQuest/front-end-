import { Routes } from '@angular/router';
import { AppShell } from './components/layout/app-shell/app-shell';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: '',
        children: [
            { path: '', component: Dashboard },
        ]
    },
    { path: '**', redirectTo: '' } // fallback to dashboard
];
