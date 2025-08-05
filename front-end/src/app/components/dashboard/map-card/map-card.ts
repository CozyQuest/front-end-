import { AfterViewInit, Component, inject, isDevMode } from '@angular/core';
import { MapMarkerService } from '../../../core/services/map-marker.service';
import { MapMarker } from '../../../core/interfaces/map-marker.model';

declare const jsVectorMap: any;

@Component({
  selector: 'app-map-card',
  standalone: true,
  templateUrl: './map-card.html',
  styleUrls: ['./map-card.css'],
  imports: []
})
export class MapCard implements AfterViewInit {
  private mapMarkerService = inject(MapMarkerService);
  private markers: MapMarker[] = [];

  ngAfterViewInit(): void {
    this.mapMarkerService.getMarkers().subscribe({
      next: (data) => {
        this.markers = data;
        this.initMap(); // Call after data is loaded
      },
      error: (err) => {
        if (isDevMode()) console.error('Error loading markers:', err);
      }
    });
  }

  private mapInstance: any;

  private initMap(): void {
    if (typeof jsVectorMap !== 'undefined') {
      try {
        this.mapInstance = new jsVectorMap({
          map: 'world',
          selector: '#map',
          zoomOnScroll: false,
          zoomButtons: false,
          selectedMarkers: [0, 1],
          markersSelectable: true,
          markers: this.markers,
          markerStyle: {
            initial: { fill: '#16a34a' },
            selected: { fill: '#94a3b8' }
          },
          labels: {
            markers: {
              render: (marker: any) => marker.name
            }
          }
        });

        window.addEventListener('resize', () => {
          this.mapInstance && this.mapInstance.updateSize();
        });
      } catch (e) {
        if (isDevMode()) console.error('Map init error:', e);
      }
    } else {
      if (isDevMode()) console.error('jsVectorMap is not loaded.');
    }
  }
}
