import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-recent-transactions',
    imports: [CommonModule],
    templateUrl: './recent-transactions.html',
    styleUrl: './recent-transactions.css'
})
export class RecentTransactions {
    transactions = [
        {
            img: 'assets/images/property/1.jpg',
            date: '10th Aug 2023',
            name: 'Mr. Rocky',
            price: '$1245/M',
            type: 'Rent',
            status: 'Paid'
        },
        {
            img: 'assets/images/property/2.jpg',
            date: '10th Aug 2023',
            name: 'Mr. Cristino',
            price: '$12450',
            type: 'Sell',
            status: 'Unpaid'
        },
        {
            img: 'assets/images/property/3.jpg',
            date: '10th Aug 2023',
            name: 'Mr. Jack',
            price: '$12450',
            type: 'Sell',
            status: 'Paid'
        },
        {
            img: 'assets/images/property/4.jpg',
            date: '10th Aug 2023',
            name: 'Ms. Cally',
            price: '$12450',
            type: 'Sell',
            status: 'Unpaid'
        },
        {
            img: 'assets/images/property/5.jpg',
            date: '10th Aug 2023',
            name: 'Ms. Cristina',
            price: '$1245/M',
            type: 'Rent',
            status: 'Unpaid'
        },
    ];

    getStatusClass(status: string): string {
        return status === 'Paid'
            ? 'bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600 border border-emerald-600/10 dark:border-emerald-600/20'
            : 'bg-red-600/10 dark:bg-red-600/20 text-red-600 border border-red-600/10 dark:border-red-600/20';
    }
}
