import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentTransaction } from '../../../core/interfaces/recent-transaction.model';
import { RecentTransactionService } from '../../../core/services/recent-transaction.service';

@Component({
  selector: 'app-recent-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recent-transactions.html',
  styleUrl: './recent-transactions.css'
})
export class RecentTransactions implements OnInit {
  transactions: RecentTransaction[] = [];

  constructor(private recentTransactionService: RecentTransactionService) {}

  ngOnInit(): void {
    this.recentTransactionService.getRecentTransactions().subscribe({
      next: (res) => this.transactions = res,
      error: (err) => console.error('Failed to load transactions:', err)
    });
  }

  getStatusClass(status: string): string {
    return status === 'Paid'
      ? 'bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600 border border-emerald-600/10 dark:border-emerald-600/20'
      : 'bg-red-600/10 dark:bg-red-600/20 text-red-600 border border-red-600/10 dark:border-red-600/20';
  }
}
