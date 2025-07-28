import { Component, OnInit, ChangeDetectorRef, effect, inject } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-revenue-chart',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './revenue-chart.html'
})
export class RevenueChart implements OnInit {
  chartData: any;
  chartOptions: any;

  platformId = inject(PLATFORM_ID);

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--p-text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
      const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

      this.chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'No. of Sales',
            data: [0, 100, 40, 110, 60, 140, 55, 130, 65, 180, 75, 115],
            borderColor: '#94a3b8',
            backgroundColor: 'rgba(148, 163, 184, 0.2)',
            tension: 0.4,
            fill: true,
            borderWidth: 1.5
          },
          {
            label: 'Revenue',
            data: [0, 45, 10, 75, 35, 94, 40, 115, 30, 105, 65, 110],
            borderColor: '#16a34a',
            backgroundColor: 'rgba(22, 163, 74, 0.2)',
            tension: 0.4,
            fill: true,
            borderWidth: 1.5,
            borderDash: [4, 4]
          }
        ]
      };

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

      this.cd.markForCheck();
    }
  }
}
