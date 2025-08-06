export interface RentedProperty {
  id: number;
  title: string;
  mainImageUrl: string;
  rate: number;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}