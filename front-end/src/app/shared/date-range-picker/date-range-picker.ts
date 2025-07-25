import { Component, Input, Output, EventEmitter, output } from '@angular/core'; // Import Input
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isWithinInterval,
  isSameMonth, // Keep isSameMonth import for internal use
  isBefore,
} from 'date-fns';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-date-range-picker',
  imports: [DatePipe, NgClass],
  templateUrl: './date-range-picker.html',
  styleUrl: './date-range-picker.css'
})
export class DateRangePicker {
  currentMonth = new Date();
  startDate: Date | null = null;
  endDate: Date | null = null;
  daysShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  today = new Date(); // Store the current date
  dateRangeSelected = output<{ startDate: Date | null, endDate: Date | null }>()

  // Input property to receive a list of dates to disable
  @Input() disabledDates: Date[] = [];

  /**
   * Generates an array of dates for the calendar view of a given month offset.
   * @param offset The offset from the current month (0 for current, 1 for next, etc.).
   * @returns An array of Date objects representing the days in the calendar view.
   */
  getCalendarDates(offset: number): Date[] {
    const month = addMonths(this.currentMonth, offset);
    const start = startOfWeek(startOfMonth(month));
    const end = endOfWeek(endOfMonth(month));
    return eachDayOfInterval({ start, end });
  }

  /**
   * Returns the name of the month and year for a given base date and offset.
   * @param base The base date.
   * @param offset The offset from the base date.
   * @returns A string representing the month and year (e.g., "July 2025").
   */
  getMonthName(base: Date, offset: number): string {
    const date = addMonths(base, offset);
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  }

  /**
   * Handles the selection of a date.
   * It sets the start and end dates for the range picker,
   * ensuring that disabled dates cannot be selected.
   * @param date The date selected by the user.
   */
  selectDate(date: Date) {
    // Prevent selection if the clicked date itself is disabled
    if (this.isDateDisabled(date)) {
      return;
    }

    // Scenario 1: No start date, or both start and end dates are already set.
    // This means the user is starting a new selection.
    if (!this.startDate || (this.startDate && this.endDate)) {
      this.startDate = date;
      this.endDate = null;
    } else {
      // Scenario 2: startDate is set, endDate is null.
      // The user is now picking the end date for a potential range.

      let potentialStart = this.startDate;
      let potentialEnd = date;

      // Ensure potentialStart is always before or the same as potentialEnd
      // for correct interval calculation, regardless of click order.
      if (isBefore(potentialEnd, potentialStart)) {
        [potentialStart, potentialEnd] = [potentialEnd, potentialStart]; // Swap dates
      }

      // Check if any date within the proposed range is disabled.
      const daysInProposedRange = eachDayOfInterval({ start: potentialStart, end: potentialEnd });
      const containsBlockedDate = daysInProposedRange.some(day => this.isDateDisabled(day));

      if (containsBlockedDate) {
        // If the proposed range contains a disabled date, prevent setting the range.
        // Instead, reset the selection to start a new range from the currently clicked date.
        this.startDate = date;
        this.endDate = null;
      } else {
        // If no blocked dates are found in the proposed range, set the range normally.
        if (isBefore(date, this.startDate)) {
          this.endDate = this.startDate;
          this.startDate = date;
        } else {
          this.endDate = date;
        }
        // Emit the final selected range
        this.dateRangeSelected.emit({ startDate: this.startDate, endDate: this.endDate });
        console.log('Selected Start Date:', this.startDate);
        console.log('Selected End Date:', this.endDate);
      }
    }
  }

  /**
   * Checks if a given date is the start date of the selected range.
   * @param date The date to check.
   * @returns True if the date is the start date, false otherwise.
   */
  isStart(date: Date): boolean {
    return this.startDate ? isSameDay(date, this.startDate) : false;
  }

  /**
   * Checks if a given date is the end date of the selected range.
   * @param date The date to check.
   * @returns True if the date is the end date, false otherwise.
   */
  isEnd(date: Date): boolean {
    return this.endDate ? isSameDay(date, this.endDate) : false;
  }

  /**
   * Checks if a given date falls within the selected date range.
   * @param date The date to check.
   * @returns True if the date is within the range, false otherwise.
   */
  isInRange(date: Date): boolean {
    if (this.startDate && this.endDate) {
      return isWithinInterval(date, {
        start: this.startDate,
        end: this.endDate,
      });
    }
    return false;
  }

  /**
   * Checks if a given date should be disabled.
   * A date is disabled if it's in the future (past the current day)
   * or if it's present in the `disabledDates` input array.
   * @param date The date to check.
   * @returns True if the date is disabled, false otherwise.
   */
  isDateDisabled(date: Date): boolean {
    // Disable dates past the current day (i.e., dates before today)
    if (isBefore(date, this.today) && !isSameDay(date, this.today)) {
      return true;
    }

    // Disable specific dates provided in the input array
    return this.disabledDates.some((disabledDate) =>
      isSameDay(date, disabledDate)
    );
  }

  /**
   * Checks if a given date belongs to the month currently displayed in the calendar.
   * This is used to dim dates that fall outside the current month's boundaries.
   * @param date The date to check.
   * @param monthOffset The offset of the current calendar month (0 for current, 1 for next).
   * @returns True if the date is in the current displayed month, false otherwise.
   */
  isDateInCurrentDisplayedMonth(date: Date, monthOffset: number): boolean {
    const displayedMonth = addMonths(this.currentMonth, monthOffset);
    return isSameMonth(date, displayedMonth);
  }

  isToday(date: Date): boolean {
  return isSameDay(date, this.today);
  }

  /**
   * Navigates to the previous month in the calendar.
   */
  prevMonth() {
    this.currentMonth = subMonths(this.currentMonth, 1);
  }

  /**
   * Navigates to the next month in the calendar.
   */
  nextMonth() {
    this.currentMonth = addMonths(this.currentMonth, 1);
  }
}
