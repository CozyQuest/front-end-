import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsLoaderService {
  private apiKey = environment.GoogleMapsApiKey;
  private mapsLoaded = false;
  private loadPromise: Promise<void> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  load(): Promise<void> {
    // Return immediately if not in browser
    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve();
    }

    // If already loaded, return resolved promise
    if (this.mapsLoaded) {
      return Promise.resolve();
    }

    // If loading is in progress, return the existing promise
    if (this.loadPromise) {
      return this.loadPromise;
    }

    // Create new loading promise
    this.loadPromise = new Promise((resolve, reject) => {
      // Check if Google Maps is already available (in case script was loaded elsewhere)
      if (typeof google !== 'undefined' && google.maps) {
        this.mapsLoaded = true;
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        this.mapsLoaded = true;
        resolve();
      };

      script.onerror = (error) => {
        console.error('Failed to load Google Maps script:', error);
        this.loadPromise = null; // Reset promise so it can be retried
        reject(new Error('Failed to load Google Maps script'));
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  isLoaded(): boolean {
    return isPlatformBrowser(this.platformId) && this.mapsLoaded;
  }
}
