export interface Property{
  id: number;
  title: string;
  description: string;
  propertyTypeId: number;
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
  mainImageUrl: string;
  images: string[];
  status: number;
  propertyTypeName?: string | null;
  imageUrls?: string[] | null;
  averageRating?: number | null;
  reviewsCount: number;
  serviceNames?: string[] | null;
  services?: Service[] | null;
}

export interface Service {
  id: number;
  name: string;
  icon: string;
}

export interface PropertyFilterRequest {
  search?: string;
  propertyTypeIds?: number[];
  serviceIds?: number[];
  country?: string;
  city?: string;
  district?: string;
  minRoomCount?: number;
  maxPrice?: number;
  minPeople?: number;
  PageNumber?: number;
  PageSize?: number;
}

export interface PropertyFilterResponse {
  items: Property[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export interface PropertyType {
  id: number;
  name: string;
}
