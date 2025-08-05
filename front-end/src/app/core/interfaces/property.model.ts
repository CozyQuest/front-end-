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
  // services: GetAllServiceDTO[];
  // user: UserOwnerDTO;
}


