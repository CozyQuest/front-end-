import { Component } from '@angular/core';
import { DashboardShell } from './components/dashboard-shell/dashboard-shell';

@Component({
    selector: 'app-root',
    imports: [DashboardShell],
    templateUrl: './app.html',
    styleUrl: './app.css'
})
export class App {
    protected title = 'dashboard';
}
