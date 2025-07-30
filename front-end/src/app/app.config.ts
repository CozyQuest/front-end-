import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, PLATFORM_ID, inject } from '@angular/core';
import { provideRouter, withHashLocation, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { isPlatformBrowser } from '@angular/common';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    
    // Register the HTTP interceptor conditionally for browser only
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => {
        const platformId = inject(PLATFORM_ID);
        return isPlatformBrowser(platformId) ? AuthInterceptor : null;
      },
      deps: [PLATFORM_ID],
      multi: true // Allows multiple interceptors
    },
    
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withViewTransitions({}),withInMemoryScrolling({scrollPositionRestoration: 'top'})),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
      providePrimeNG({
        theme: {
          preset: Aura,
          options: {
            darkModeSelector: false || 'none'
          }
        }
      })
  ]
};
