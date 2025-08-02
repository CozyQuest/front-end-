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

  @Output() selectedAmenitiesChange = new EventEmitter<string[]>();

  amenities: Amenity[] = [
    { name: 'Wi-Fi', icon: 'fa-solid fa-wifi' },
    { name: 'Air Conditioning', icon: 'fa-solid fa-snowflake' },
    { name: 'Heating', icon: 'fa-solid fa-temperature-high' },
    { name: 'Kitchen', icon: 'fa-solid fa-utensils' },
    { name: 'Washer', icon: 'fa-solid fa-soap' },
    { name: 'Dryer', icon: 'fa-solid fa-tshirt' },
    { name: 'TV', icon: 'fa-solid fa-tv' },
    { name: 'Parking', icon: 'fa-solid fa-square-parking' },
    { name: 'Swimming Pool', icon: 'fa-solid fa-water-ladder' },
    { name: 'Gym', icon: 'fa-solid fa-dumbbell' },
    { name: 'Balcony', icon: 'fa-solid fa-chair' },
    { name: 'Elevator', icon: 'fa-solid fa-arrow-up' },
    { name: 'Pet Friendly', icon: 'fa-solid fa-paw' },
    { name: 'Smoking Allowed', icon: 'fa-solid fa-smoking' },
    { name: 'BBQ Grill', icon: 'fa-solid fa-fire' },
    { name: 'Security', icon: 'fa-solid fa-shield-halved' },
    { name: 'Wheelchair Accessible', icon: 'fa-solid fa-wheelchair' },
    { name: 'Garden', icon: 'fa-solid fa-tree' },
    { name: 'Fireplace', icon: 'fa-solid fa-fire-flame-curved' },
    { name: 'Hot Tub', icon: 'fa-solid fa-hot-tub' }
  ];

  selectedAmenities: string[] = [];

  toggleAmenity(amenity: string) {
    if (this.selectedAmenities.includes(amenity)) {
      this.selectedAmenities = this.selectedAmenities.filter(a => a !== amenity);
    } else {
      this.selectedAmenities.push(amenity);
    }
    this.selectedAmenitiesChange.emit(this.selectedAmenities); // emit whenever changed
  }

  isSelected(amenity: string) {
    return this.selectedAmenities.includes(amenity);
  }
}
