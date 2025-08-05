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
          {
            match: 'rentings',
            yAxisID: 'y',
            borderColor: '#6366F1',
            backgroundColor: 'rgba(99, 102, 241, 0.2)',
            borderDash: []
          },
          {
            match: 'revenue',
            yAxisID: 'y1',
            borderColor: '#00a63e',
            backgroundColor: 'rgba(0, 166, 62, 0.2)',
            borderDash: [4, 4]
          }
        ];

        this.chartData = {
          labels: data.labels,
          datasets: data.datasets.map((dataset) => {
            const match = baseColors.find(c =>
              dataset.label.toLowerCase().includes(c.match)
            ) ?? baseColors[0];

            return {
              ...dataset,
              yAxisID: match.yAxisID,
              borderColor: match.borderColor,
              backgroundColor: match.backgroundColor,
              borderDash: match.borderDash,
              tension: 0.4,
              fill: true,
              pointRadius: 0,
              pointHoverRadius: 4,
              borderWidth: 2
            };
          })
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
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: textColor,
            usePointStyle: true
          }
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#F9FAFB',
          bodyColor: '#E5E7EB',
          cornerRadius: 6,
          callbacks: {
            label: (tooltipItem: any) => {
              const label = tooltipItem.dataset.label || '';
              const value = tooltipItem.formattedValue;
              return label.toLowerCase().includes('revenue')
                ? `${label}: $${value}`
                : `${label}: ${value} rentings`;
            }
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
            font: { size: 12 }
          },
          grid: {
            color: surfaceBorder,
            borderDash: [4, 4],
            drawBorder: true
          }
        },
        y: {
          type: 'linear',
          position: 'left',
          beginAtZero: true,
          title: {
            display: true,
            text: 'No. of Rentings',
            color: textColorSecondary,
            font: { size: 12 }
          },
          ticks: {
            color: textColorSecondary,
            precision: 0
          },
          grid: {
            color: surfaceBorder,
            borderDash: [4, 4]
          }
        },
        y1: {
          type: 'linear',
          position: 'right',
          beginAtZero: true,
          grid: {
            drawTicks: false,
            drawOnChartArea: false,
            drawBorder: false
          },
          title: {
            display: true,
            text: 'Revenue ($)',
            color: textColorSecondary,
            font: { size: 12 }
          },
          ticks: {
            color: textColorSecondary,
            precision: 0
          }
        }
      }
    };
  }
}
