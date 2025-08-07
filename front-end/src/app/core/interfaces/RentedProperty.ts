export interface RentedProperty {
  propertyId: number;
  title: string;
  mainImageUrl: string;
  rate: number;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
}