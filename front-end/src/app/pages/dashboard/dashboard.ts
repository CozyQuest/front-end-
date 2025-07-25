import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from '../../components/dashboard/stat-card/stat-card';
import { MapCard } from '../../components/dashboard/map-card/map-card';
import { RevenueChart } from '../../components/dashboard/revenue-chart/revenue-chart';
import { SalesBreakdown } from '../../components/dashboard/sales-breakdown/sales-breakdown';
import { RecentTransactions } from '../../components/dashboard/recent-transactions/recent-transactions';
import { TopProperties } from '../../components/dashboard/top-properties/top-properties';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        StatCard,
        MapCard,
        RevenueChart,
        SalesBreakdown,
        RecentTransactions,
        TopProperties,
        CommonModule
    ],
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']
})
export class Dashboard {
    @HostBinding('class') class = 'container-fluid relative px-3';
    
    cards = [
        { title: 'Total Revenue', value: 45890, currency: '$', icon: 'currency-usd' },
        { title: 'Total Visitor', value: 2456, icon: 'account-group-outline' },
        { title: 'Total Properties', value: 358, icon: 'home-city-outline' },
        { title: 'Properties for Sell', value: 243, icon: 'home-lightning-bolt-outline' },
        { title: 'Properties for Rent', value: 115, icon: 'home-clock-outline' }
    ];
}
