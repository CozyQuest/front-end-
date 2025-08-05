export interface PropertyResponse {
  id: number;
  title: string;
  description: string;
  propertyTypeId: number;
  longitude: number;
  latitude: number;
  roomCount: number;
  bathroomCount: number;
  country: string;
  city: string;
  district: string;
  buildingNo: number;
  level: number;
  flatNo: number;
  space: number;
  price: number;
  peopleCapacity: number;
  mainImageUrl: string;
  images: string[];
  services: { id: number; name: string; icon: string }[];
  user: {
    id: string;
    firstName: string;
    lastName: string;
    urlProfilePicture: string;
  };
}