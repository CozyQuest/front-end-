import { Component, AfterViewInit } from '@angular/core';

import ApexCharts from 'apexcharts';

@Component({
    selector: 'app-revenue-chart',
    standalone: true,
    templateUrl: './revenue-chart.html',
    styleUrls: ['./revenue-chart.css']
})
export class RevenueChart implements AfterViewInit {
    ngAfterViewInit(): void {
        const options = {
            chart: {
                height: 360,
                type: 'area',
                width: '100%',
                stacked: true,
                toolbar: { show: false }
            },
            colors: ['#94a3b8', '#16a34a'],
            stroke: {
                curve: 'smooth',
                width: [1.5, 1.5],
                dashArray: [0, 4]
            },
            series: [
                { name: 'No. of Sales', data: [0, 100, 40, 110, 60, 140, 55, 130, 65, 180, 75, 115] },
                { name: 'Revenue', data: [0, 45, 10, 75, 35, 94, 40, 115, 30, 105, 65, 110] }
            ],
            xaxis: {
                type: 'month',
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 0.8,
                    opacityFrom: 0.3,
                    opacityTo: 0.2,
                    stops: [0, 80, 100]
                }
            },
            legend: { position: 'bottom', offsetY: 0 }
        };

        const chart = new ApexCharts(document.querySelector('#mainchart'), options);
        chart.render();
    }
}
