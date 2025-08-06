export interface RentingHistoryItem {
  propertyTitle: string;
  propertyImageUrl: string;
  renterFullName: string;
  checkIn: Date;
  checkOut: Date;
  transactionDate: Date;
  rating: number | null;
  totalPrice: number;
}
