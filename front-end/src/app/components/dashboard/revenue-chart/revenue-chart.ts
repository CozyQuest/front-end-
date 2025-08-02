import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { RevenueService } from '../../../core/services/revenue.service';
import { RevenueData } from '../../../core/interfaces/revenue-data.model';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './revenue-chart.html'
})
export class RevenueChart implements OnInit {
  chartData: RevenueData | undefined;
  chartOptions: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef, private revenueService: RevenueService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initChartOptions();
      this.fetchChartData('Y');
    }
  }

  onPeriodChange(event: Event): void {
    const period = (event.target as HTMLSelectElement).value;
    this.fetchChartData(period);
  }

  private fetchChartData(period: string): void {
    this.revenueService.getRevenueData(period).subscribe({
      next: (data) => {
        const baseColors = [
          { borderColor: '#6366F1', backgroundColor: 'rgba(99, 102, 241, 0.2)' }, // For "No. of Rentings"
          { borderColor: '#F59E0B', backgroundColor: 'rgba(245, 158, 11, 0.2)' }  // For "Revenue"
        ];

        this.chartData = {
          labels: data.labels,
          datasets: data.datasets.map((dataset, index) => ({
            ...dataset,
            borderColor: baseColors[index].borderColor,
            backgroundColor: baseColors[index].backgroundColor,
            tension: 0.4,
            fill: true,
            borderWidth: 2
          }))
        };

        this.cd.markForCheck();
      },
      error: (err) => console.error('Error fetching revenue data:', err)
    });
  }


  private initChartOptions(): void {
    const style = getComputedStyle(document.documentElement);
    const textColor = style.getPropertyValue('--p-text-color');
    const textColorSecondary = style.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = style.getPropertyValue('--p-content-border-color');

    this.chartOptions = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }
}
