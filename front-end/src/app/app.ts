import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PropertyList } from "./components/properties/property-list/property-list";
import { PropertyCard } from './components/properties/property-list/property-card/property-card';
import { FilterComponent } from './components/properties/property-list/filter-card/filter-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PropertyList, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front-end');
}
