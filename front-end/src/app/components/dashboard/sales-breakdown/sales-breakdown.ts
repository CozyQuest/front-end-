import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-sales-breakdown',
    imports: [CommonModule],
    templateUrl: './sales-breakdown.html',
    styleUrl: './sales-breakdown.css'
})
export class SalesBreakdown {
    sources = [
        { label: 'Via Website', percent: 50 },
        { label: 'Via Team Member', percent: 12 },
        { label: 'Via Agents', percent: 6 },
        { label: 'Via Social Media', percent: 15 },
        { label: 'Via Digital Marketing', percent: 12 },
        { label: 'Via Others', percent: 5 },
    ];
}
