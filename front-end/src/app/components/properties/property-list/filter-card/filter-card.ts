import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter-card.html'
})
export class FilterComponent {
  @Output() filterApplied = new EventEmitter<any>();

  applyFilter() {
    // You can emit filter values here
    this.filterApplied.emit({
      // filter values
    });
  }
}