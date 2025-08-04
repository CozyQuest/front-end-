import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Property } from '../interfaces/Property';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Pagination } from '../interfaces/pagination.model';
import { PagedResult } from '../interfaces/page-result.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = 'https://your-api-url.com/api/property'; // replace with your actual API

  constructor(private http: HttpClient) {}

  getAllProperties(pagination: Pagination): Observable<PagedResult<Property>> {
    let params = new HttpParams()
      .set('pageNumber', pagination.pageNumber)
      .set('pageSize', pagination.pageSize);

    return this.http.get<PagedResult<Property>>(`${this.apiUrl}/all`, { params });
}
getFilteredProperties(filter: any): Observable<PagedResult<Property>> {
  return this.http.get<PagedResult<Property>>('/api/property/filter', { params: filter });
}

}
