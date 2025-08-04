export interface Property {
  id: number;
  title: string;
  description: string;
  country: string;
  city: string;
  district: string;
  buildingNo: number;
  level: number;
  flatNo: number;
  longitude: number;
  latitude: number;
  roomCount: number;
  bathroomCount: number;
  space: number;
  price: number;
  peopleCapacity: number;
  status: number;
  mainImageUrl: string;
  propertyTypeName?: string | null;
  imageUrls?: string[] | null;
  averageRating?: number | null;
  reviewsCount: number;
  serviceNames?: string[] | null;
}
