import {
  Component, ElementRef,
  ViewChild,
  OnInit,
  AfterViewInit,
  ChangeDetectorRef,
  Inject,
  PLATFORM_ID,
  Output,
  EventEmitter
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { GoogleMapsLoaderService } from '../../core/services/google-maps-loader.service';

@Component({
  selector: 'app-map',
  imports: [CommonModule],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements OnInit, AfterViewInit {
  @ViewChild('mapElement') mapElement!: ElementRef;
  @ViewChild('searchInput') searchInput!: ElementRef;

  @Output() locationSelected = new EventEmitter<LocationData>();

  selectedLocation!: LocationData;

  map!: google.maps.Map;
  marker!: google.maps.Marker;
  geocoder!: google.maps.Geocoder;
  autocomplete!: google.maps.places.Autocomplete;

  result = '';

  constructor(
    private http: HttpClient, 
    private cdr: ChangeDetectorRef, 
    private gmapsLoader: GoogleMapsLoaderService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
  }

  async ngAfterViewInit(): Promise<void> {
    // Only run on browser, not during SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      await this.gmapsLoader.load();

      // Initialize geocoder after Google Maps is loaded
      this.geocoder = new google.maps.Geocoder();

      const defaultLatLng = new google.maps.LatLng(31.2001, 29.9187);

      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: defaultLatLng,
        zoom: 14,
      });

      this.marker = new google.maps.Marker({
        position: defaultLatLng,
        map: this.map,
      });

      this.map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (e.latLng) {
          const lat = e.latLng.lat();
          const lng = e.latLng.lng();
          this.marker.setPosition(e.latLng);
          this.reverseGeocode(lat, lng);
        }
      });

      this.autocomplete = new google.maps.places.Autocomplete(
        this.searchInput.nativeElement,
        { types: ['geocode'] }
      );

      this.autocomplete.addListener('place_changed', () => {
        const place = this.autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          this.result = 'Invalid address selected.';
          this.cdr.detectChanges();
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        this.map.setCenter(place.geometry.location);
        this.marker.setPosition(place.geometry.location);
        this.reverseGeocode(lat, lng);
      });
    } catch (error) {
      console.error('Error loading Google Maps:', error);
      this.result = 'Error loading Google Maps. Please try again later.';
      this.cdr.detectChanges();
    }
  }

  reverseGeocode(lat: number, lng: number): void {
    if (!this.geocoder) {
      console.error('Geocoder not initialized');
      return;
    }

    const latlng = new google.maps.LatLng(lat, lng);

    this.geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
        const addressComponents = results[0].address_components;

        const getComponent = (type: string) => {
          const comp = addressComponents.find(c => c.types.includes(type));
          return comp?.long_name || '';
        };

        const street = getComponent('route');
        const city = getComponent('locality') ||
          getComponent('administrative_area_level_1') ||
          getComponent('postal_town') ||
          getComponent('administrative_area_level_2') ||
          '';
        const country = getComponent('country');
        const district = getComponent('administrative_area_level_3') || getComponent('administrative_area_level_2') || '';
        const formattedAddress = results[0].formatted_address;

        const payload : LocationData = {
          latitude: lat,
          longitude: lng,
          street,
          district,
          city,
          country,
          formattedAddress
        };
        
        this.selectedLocation = payload;
        // this.locationSelected.emit(payload);
        console.log('Selected Location:', this.selectedLocation);

        this.result = `
          <strong>Latitude:</strong> ${lat}<br>
          <strong>Longitude:</strong> ${lng}<br>
          <strong>Street:</strong> ${street}<br>
          <strong>District:</strong> ${district}<br>
          <strong>City:</strong> ${city}<br>
          <strong>Country:</strong> ${country}<br>
          <strong>Address: </strong> ${formattedAddress}
        `;

        this.cdr.detectChanges();



        // Logging the payload to console
        // console.log('Location payload:', payload);

        // Send to backend
        /*
        this.http.post('https://backendDomain/locations', payload)
          .subscribe({
            next: res => console.log('Location saved:', res),
            error: err => console.error('Error saving location:', err)
          });
        */
      } else {
        this.result = 'Reverse geocoding failed: ' + status;
        this.cdr.detectChanges();
      }
    });
  }

  sendLocation(): void {
  if (this.selectedLocation) {
    this.locationSelected.emit(this.selectedLocation);
  }
}
}