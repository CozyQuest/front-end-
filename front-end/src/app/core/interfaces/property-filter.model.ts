export interface PropertyFilter {
  propertyTypeIds?: number[];
  serviceIds?: number[];
  country?: string;
  city?: string;
  district?: string;
  minPeople?: number;
  minSpace?: number;
  minPrice?: number;
  maxPrice?: number;
  orderBy?: string;
  pageNumber: number;
  pageSize: number;
}
