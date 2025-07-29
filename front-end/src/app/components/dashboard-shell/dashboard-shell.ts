import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from '../dashboard/stat-card/stat-card';
import { RevenueChart } from '../dashboard/revenue-chart/revenue-chart';
import { SalesBreakdown } from '../dashboard/sales-breakdown/sales-breakdown';
import { MapCard } from '../dashboard/map-card/map-card';
import { RecentTransactions } from '../dashboard/recent-transactions/recent-transactions';
import { TopProperties } from '../dashboard/top-properties/top-properties';
import { PendingRequests } from '../dashboard/pending-requests/pending-requests';

@Component({
    selector: 'app-dashboard-shell',
    standalone: true,
    imports: [ CommonModule, StatCard, RevenueChart, SalesBreakdown, PendingRequests, MapCard, RecentTransactions, TopProperties ],
    templateUrl: './dashboard-shell.html',
    styleUrl: './dashboard-shell.css'
})
export class DashboardShell {
    cards = [
        { title: 'Total Revenue', value: 45890, currency: '$', icon: 'currency-usd' },
        { title: 'Total Visitor', value: 2456, icon: 'account-group-outline' },
        { title: 'Total Properties', value: 358, icon: 'home-city-outline' },
        { title: 'Properties for Sell', value: 243, icon: 'home-lightning-bolt-outline' },
        { title: 'Properties for Rent', value: 115, icon: 'home-clock-outline' }
    ];
}
