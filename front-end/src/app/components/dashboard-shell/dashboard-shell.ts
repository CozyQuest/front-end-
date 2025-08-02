import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatCard } from '../dashboard/stat-card/stat-card';
import { RevenueChart } from '../dashboard/revenue-chart/revenue-chart';
import { SalesBreakdown } from '../dashboard/sales-breakdown/sales-breakdown';
import { MapCard } from '../dashboard/map-card/map-card';
import { RecentTransactions } from '../dashboard/recent-transactions/recent-transactions';
import { TopProperties } from '../dashboard/top-properties/top-properties';
import { PendingRequests } from '../dashboard/pending-requests/pending-requests';
import { StatService } from '../../core/services/stat.service';
import { Stat } from '../../core/interfaces/stat.model';

@Component({
    selector: 'app-dashboard-shell',
    standalone: true,
    imports: [CommonModule, StatCard, RevenueChart, SalesBreakdown, PendingRequests, MapCard, RecentTransactions, TopProperties],
    templateUrl: './dashboard-shell.html',
    styleUrl: './dashboard-shell.css'
})
export class DashboardShell implements OnInit {
    cards: Stat[] = [];

    constructor(private statService: StatService) { }

    ngOnInit(): void {
        this.loadStats();
    }

    private loadStats(): void {
        this.statService.getStats().subscribe({
            next: (stats) => (this.cards = stats),
            error: (err) => console.error('Error loading stat cards:', err)
        });
    }

    onPropertyApproved(): void {
        this.loadStats();
    }
}
