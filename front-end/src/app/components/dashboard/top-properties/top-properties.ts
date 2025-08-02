import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopPropertyService } from '../../../core/services/top-property.service';
import { TopProperty } from '../../../core/interfaces/top-property.model';

@Component({
  selector: 'app-top-properties',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-properties.html',
  styleUrl: './top-properties.css',
})
export class TopProperties implements OnInit {
  properties: TopProperty[] = [];

  constructor(private topPropertyService: TopPropertyService) {}

  ngOnInit() {
    this.topPropertyService.getTopProperties().subscribe({
      next: (res) => (this.properties = res),
      error: (err) => console.error('Failed to load top properties', err)
    });
  }
}
