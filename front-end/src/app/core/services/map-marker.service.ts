import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MapMarker } from '../interfaces/map-marker.model';

@Injectable({ providedIn: 'root' })
export class MapMarkerService {
  private apiUrl = 'https://localhost:7279/api/dashboard/mapmarkers';

  constructor(private http: HttpClient) {}

  getMarkers(): Observable<MapMarker[]> {
    return this.http.get<MapMarker[]>(`${this.apiUrl}`);
  }
}
