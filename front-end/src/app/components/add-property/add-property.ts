import { Image } from '../../core/interfaces/image';
import { Component } from '@angular/core';
import { IAddProperty } from '../../core/interfaces/AddProperty';
import { Card } from "../../shared/card/card";
import { Carousel } from 'primeng/carousel';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IpropertyType } from '../../core/interfaces/iproperty-type';

@Component({
  selector: 'app-add-property',
  imports: [Card , Carousel,CommonModule,FormsModule],
  templateUrl: './add-property.html',
  styleUrl: './add-property.css'
})
export class AddProperty {
  property!: IAddProperty;
  propertyType:IpropertyType[] = [
    { id: '1', name: 'Apartment' },
    { id: '2', name: 'House' },
    { id: '3', name: 'Villa' },
    { id: '4', name: 'Studio' },
    { id: '5', name: 'Penthouse' }
  ];
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.property.images.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  addProperty() {
    // Logic to add the property
    console.log('Property added:', this.property);
  }
  toggleFavorite(Image: string) {
    this.property.mainImage = Image;
  }
  openMap() {
    // todo: Logic to open the map
    console.log('Open map for location:', this.property.location);
  }
}
