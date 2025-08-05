export interface Pagination {
  pageNumber: number;
  pageSize: number;
  search?: string;
  propertyTypeId?: number;
  country?: string;
  city?: string;
  district?: string;
  minRoomCount?: number;
  minPeople?: number;
  maxPrice?: number;
}
