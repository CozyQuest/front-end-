import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesBreakdownService } from '../../../core/services/dashboard/sales-breakdown.service';
import { SalesSource } from '../../../core/interfaces/dashboard/sales-source.model';

@Component({
  selector: 'app-sales-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sales-breakdown.html',
  styleUrl: './sales-breakdown.css'
})
export class SalesBreakdown implements OnInit {
  sources: SalesSource[] = [];

  constructor(private breakdownService: SalesBreakdownService) {}

  ngOnInit(): void {
    this.loadData('Y');
  }

  onPeriodChange(event: Event): void {
    const period = (event.target as HTMLSelectElement).value;
    this.loadData(period);
  }

  private loadData(period: string): void {
    this.breakdownService.getBreakdown(period).subscribe({
      next: (data) => (this.sources = data),
      error: (err) => console.error('Failed to load sales breakdown', err)
    });
  }
}
