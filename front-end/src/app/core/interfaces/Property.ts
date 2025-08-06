import { User } from "./User.model";

export interface Property {
  id: number;
  title: string;
  description: string;
  longitude: number;
  latitude: number;
  roomCount: number;
  bathroomCount: number;
  rentPerDay: number;
  country: string;
  city: string;
  district: string;
  buildingNo: string;
  flatNo: string;
  images: { id: number; url: string }[];
  ratings: { rating: number }[];
  services: { id: number; name: string }[];
  owner: User;
  Guests: number;
  Area: number;
}