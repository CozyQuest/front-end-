import { User } from "./user.model";

export interface Review {
  id: number;
  userId: number;
  propertyId: number;
  review: string;
  rating: number;
  date: string; 
  user?: User;
}