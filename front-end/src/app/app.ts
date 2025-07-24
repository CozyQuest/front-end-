import { Component, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { PropertyDetails } from './components/properties/property-details/property-details';

@Component({
  selector: 'app-root',
  imports: [PropertyDetails],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-end');
}
