export interface RentingHistoryItem {
   propertyTitle: string;
   propertyImageUrl: string;
   renterName: string;
   startDate: Date;
   endDate: Date;
   totalPrice: number;
   rating: number | null;
   transactionDate: Date;
}