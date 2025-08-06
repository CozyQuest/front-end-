// apartment.model.ts
export interface Apartment {
  id: number;
  title: string;
  imageUrl: string;
  area: number;
  beds: number;
  baths: number;
  price: number;
  rating: number;
  reviewCount: number;
  location: string;
  // Optional properties for backward compatibility
  space?: number;
  roomCount?: number;
  bathroomCount?: number;
  averageRating?: number;
  reviewsCount?: number;
}