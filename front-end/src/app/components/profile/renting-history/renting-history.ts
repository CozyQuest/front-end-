import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { RentingHistoryItem } from '../../../core/interfaces/rentingHistoryItem.model';
import { DatePipe } from '@angular/common';
import { NgClass } from '@angular/common';
import { RentingHistoryService } from '../../../core/services/renting-history.service';


@Component({
  selector: 'app-renting-history',
  imports: [DatePipe,NgClass],
  templateUrl: './renting-history.html',
  styleUrl: './renting-history.css'
})
export class RentingHistory {
@Input() hostId!: string;

  history: RentingHistoryItem[] = [];
  totalProfit: number = 0;

  constructor(private service: RentingHistoryService) {}

  ngOnInit(): void {
    console.log('RentingHistoryComponent init, hostId =', this.hostId); // DEBUG
    if (this.hostId) {
      this.loadData();
    }
  }

  private async loadData(): Promise<void> {
      const data = await this.service.getHostEarnings(this.hostId);
      this.history = data.items;
      this.totalProfit = data.totalProfit;
  }
}