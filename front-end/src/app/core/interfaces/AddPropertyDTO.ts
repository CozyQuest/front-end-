export interface AddPropertyRequest {
  Title: string;
  Description: string;
  PropertyTypeId: number;
  Country: string;
  City: string;
  District: string;
  BuildingNo: number;
  Level: number;
  FlatNo: number;
  Longitude: number;
  Latitude: number;
  RoomCount: number;
  BathroomCount: number;
  Space: number;
  Price: number;
  PeopleCapacity: number;
  MainImage: File | null;
  Images: File[];
  ServiceIds: number[];
}
