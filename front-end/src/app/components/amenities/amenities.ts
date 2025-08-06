import { Component, EventEmitter, Output } from '@angular/core';
import { Amenity } from '../../core/interfaces/Amenity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-amenities',
  imports: [CommonModule],
  templateUrl: './amenities.html',
  styleUrl: './amenities.css'
})
export class Amenities {

   @Output() selectedAmenitiesChange = new EventEmitter<number[]>();

  amenities: Amenity[] = [
    { id: 1, name: 'Wi-Fi', icon: 'fa-solid fa-wifi' },
    { id: 2, name: 'Air Conditioning', icon: 'fa-solid fa-snowflake' },
    { id: 3, name: 'Heating', icon: 'fa-solid fa-temperature-high' },
    { id: 4, name: 'Kitchen', icon: 'fa-solid fa-utensils' },
    { id: 5, name: 'Washer', icon: 'fa-solid fa-soap' },
    { id: 6, name: 'Dryer', icon: 'fa-solid fa-tshirt' },
    { id: 7, name: 'TV', icon: 'fa-solid fa-tv' },
    { id: 8, name: 'Parking', icon: 'fa-solid fa-square-parking' },
    { id: 9, name: 'Swimming Pool', icon: 'fa-solid fa-water-ladder' },
    { id: 10, name: 'Gym', icon: 'fa-solid fa-dumbbell' },
    { id: 11, name: 'Balcony', icon: 'fa-solid fa-chair' },
    { id: 12, name: 'Elevator', icon: 'fa-solid fa-arrow-up' },
    { id: 13, name: 'Pet Friendly', icon: 'fa-solid fa-paw' },
    { id: 14, name: 'Smoking Allowed', icon: 'fa-solid fa-smoking' },
    { id: 15, name: 'BBQ Grill', icon: 'fa-solid fa-fire' },
    { id: 16, name: 'Security', icon: 'fa-solid fa-shield-halved' },
    { id: 17, name: 'Wheelchair Accessible', icon: 'fa-solid fa-wheelchair' },
    { id: 18, name: 'Garden', icon: 'fa-solid fa-tree' },
    { id: 19, name: 'Fireplace', icon: 'fa-solid fa-fire-flame-curved' },
    { id: 20, name: 'Hot Tub', icon: 'fa-solid fa-hot-tub' }
  ];

  selectedAmenityIds: number[] = [];

  toggleAmenity(id: number) {
    const index = this.selectedAmenityIds.indexOf(id);
    if (index > -1) {
      this.selectedAmenityIds.splice(index, 1);
    } else {
      this.selectedAmenityIds.push(id);
    }
    this.selectedAmenitiesChange.emit(this.selectedAmenityIds);
  }

  isSelected(id: number): boolean {
    return this.selectedAmenityIds.includes(id);
  }

  get selectedAmenityNames(): string[] {
    return this.amenities
      .filter(a => this.selectedAmenityIds.includes(a.id))
      .map(a => a.name);
  }
}
