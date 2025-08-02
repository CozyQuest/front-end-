import { IpropertyType } from "./iproperty-type";

export interface IAddProperty {
  id: string;
  name: string;
  images: string[];
  mainImage: string;
  rentPerDay: number;
  area: number;
  bathrooms: number;
  bedrooms: number;
  location: string;
  propertyType: IpropertyType;
  amenities: string[];
}
