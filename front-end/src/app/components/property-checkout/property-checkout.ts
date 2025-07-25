import { Component, OnInit } from '@angular/core';
import { DateRangePicker } from '../../shared/date-range-picker/date-range-picker';
import { CommonModule } from '@angular/common'; // Import CommonModule for date pipe etc.
import { differenceInDays } from 'date-fns'; // Import differenceInDays
import { PropertyCheckoutInterface } from '../../core/interfaces/property-checkout';
import { PropertyCheckoutService } from '../../core/services/property-checkout-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-property-checkout',
  imports: [DateRangePicker, CommonModule],
  templateUrl: './property-checkout.html',
  styleUrl: './property-checkout.css'
})
export class PropertyCheckout implements OnInit {
  property!: PropertyCheckoutInterface;
    // Properties to hold the selected date range from the child component
    selectedStartDate: Date | null = null;
    selectedEndDate: Date | null = null;

    // Properties for booking summary calculations
    numberOfDays: number = 0;
    dailyRate: number = 5000; // Assuming a daily rate of $5000 from your HTML
    totalPrice: number = 0;
    
    myDisabledDates: Date[] = [
    new Date(2025, 6, 20), // July 20, 2025
    new Date(2025, 6, 25), // July 25, 2025
    new Date(2025, 7, 1),  // August 1, 2025
    new Date(2025, 7, 5),  // August 5, 2025
    new Date(2025, 7, 10) // August 10,
  ];

  constructor(
    private route: ActivatedRoute,
    private propertyCheckoutService: PropertyCheckoutService
  ) {
    // Ensure all dates are at midnight for consistent comparison
    this.myDisabledDates = this.myDisabledDates.map(date => {
      date.setHours(0, 0, 0, 0);
      return date;
    });
  }
  flag: boolean = false;
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.propertyCheckoutService.getPropertyCheckout(id).subscribe({
     next: (data) => {
       this.property = data;
       this.dailyRate = data.price;
       this.flag = true;
     },
     error: (err) => console.error('Failed to fetch property:', err),
    });
  }

  /**
   * Handles the dateRangeSelected event emitted by the DateRangePicker component.
   * Updates the selected start and end dates and recalculates booking summary.
   * @param event An object containing the startDate and endDate.
   */
  onDateRangeSelected(event: { startDate: Date | null, endDate: Date | null }) {
    this.selectedStartDate = event.startDate;
    this.selectedEndDate = event.endDate;
    this.calculateBookingSummary();
    console.log('Selected Start Date:', this.selectedStartDate);
    console.log('Selected End Date:', this.selectedEndDate);
  }

  /**
   * Calculates the number of days and total price based on the selected date range.
   */
  calculateBookingSummary() {
    if (this.selectedStartDate && this.selectedEndDate) {
      // Calculate difference in days. Add 1 because differenceInDays counts full days *between* dates.
      // For example, July 20 to July 20 is 0 days, but 1 night. July 20 to July 21 is 1 day, 1 night.
      // If you want to count the number of nights, it's just differenceInDays.
      // If you want to count the number of days *including* start and end, it's differenceInDays + 1.
      // For a booking summary, usually it's nights.
      this.numberOfDays = differenceInDays(this.selectedEndDate, this.selectedStartDate);
      this.totalPrice = this.numberOfDays * this.dailyRate;
    } else {
      // Reset if no valid range is selected
      this.numberOfDays = 0;
      this.totalPrice = 0;
    }
  }
}
