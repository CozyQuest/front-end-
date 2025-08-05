import { Component } from '@angular/core';
import { RentingHistoryItem } from '../../../core/interfaces/RentingHistory';
import { DatePipe } from '@angular/common';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-renting-history',
  imports: [DatePipe,NgClass],
  templateUrl: './renting-history.html',
  styleUrl: './renting-history.css'
})
export class RentingHistory {
 history: RentingHistoryItem[] = [];

  totalProfit = 0;

  ngOnInit(): void {
    this.history = [
      {
        propertyTitle: 'Nile View Flat',
        propertyImageUrl: 'https://media.istockphoto.com/id/2155879454/photo/this-is-an-exterior-photo-of-a-home-for-sale-in-beverly-hills-ca.jpg?s=612x612&w=0&k=20&c=uSKacMQvmaYX5Pf5Br7pUfErYQbNt_UWXRTjfwrdSDQ=',
        renterName: 'Ahmed ElSayed',
        startDate: new Date('2025-05-10'),
        endDate: new Date('2025-05-20'),
        totalPrice: 1500,
        rating: 4,
        transactionDate: new Date('2025-05-01'),
      },
      {
        propertyTitle: 'Zamalek Studio',
        propertyImageUrl: 'https://www.malabardevelopers.com/wp-content/uploads/2020/01/benefits-of-investing-in-a-villa.jpg',
        renterName: 'Mona Khaled',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-07'),
        totalPrice: 1000,
        rating: null,
        transactionDate: new Date('2025-05-30'),
      },
       {
        propertyTitle: 'Nile View Flat',
        propertyImageUrl: 'https://media.istockphoto.com/id/2155879454/photo/this-is-an-exterior-photo-of-a-home-for-sale-in-beverly-hills-ca.jpg?s=612x612&w=0&k=20&c=uSKacMQvmaYX5Pf5Br7pUfErYQbNt_UWXRTjfwrdSDQ=',
        renterName: 'Ahmed ElSayed',
        startDate: new Date('2025-05-10'),
        endDate: new Date('2025-05-20'),
        totalPrice: 1500,
        rating: 4,
        transactionDate: new Date('2025-05-01'),
      },
      {
        propertyTitle: 'Zamalek Studio',
        propertyImageUrl: 'https://www.malabardevelopers.com/wp-content/uploads/2020/01/benefits-of-investing-in-a-villa.jpg',
        renterName: 'Mona Khaled',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-07'),
        totalPrice: 1000,
        rating: null,
        transactionDate: new Date('2025-05-30'),
      },
       {
        propertyTitle: 'Nile View Flat',
        propertyImageUrl: 'https://media.istockphoto.com/id/2155879454/photo/this-is-an-exterior-photo-of-a-home-for-sale-in-beverly-hills-ca.jpg?s=612x612&w=0&k=20&c=uSKacMQvmaYX5Pf5Br7pUfErYQbNt_UWXRTjfwrdSDQ=',
        renterName: 'Ahmed ElSayed',
        startDate: new Date('2025-05-10'),
        endDate: new Date('2025-05-20'),
        totalPrice: 1500,
        rating: 4,
        transactionDate: new Date('2025-05-01'),
      },
      {
        propertyTitle: 'Zamalek Studio',
        propertyImageUrl: 'https://www.malabardevelopers.com/wp-content/uploads/2020/01/benefits-of-investing-in-a-villa.jpg',
        renterName: 'Mona Khaled',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-07'),
        totalPrice: 1000,
        rating: null,
        transactionDate: new Date('2025-05-30'),
      },
       {
        propertyTitle: 'Nile View Flat',
        propertyImageUrl: 'https://media.istockphoto.com/id/2155879454/photo/this-is-an-exterior-photo-of-a-home-for-sale-in-beverly-hills-ca.jpg?s=612x612&w=0&k=20&c=uSKacMQvmaYX5Pf5Br7pUfErYQbNt_UWXRTjfwrdSDQ=',
        renterName: 'Ahmed ElSayed',
        startDate: new Date('2025-05-10'),
        endDate: new Date('2025-05-20'),
        totalPrice: 1500,
        rating: 4,
        transactionDate: new Date('2025-05-01'),
      },
      {
        propertyTitle: 'Zamalek Studio',
        propertyImageUrl: 'https://www.malabardevelopers.com/wp-content/uploads/2020/01/benefits-of-investing-in-a-villa.jpg',
        renterName: 'Mona Khaled',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-07'),
        totalPrice: 1000,
        rating: null,
        transactionDate: new Date('2025-05-30'),
      },
       {
        propertyTitle: 'Nile View Flat',
        propertyImageUrl: 'https://media.istockphoto.com/id/2155879454/photo/this-is-an-exterior-photo-of-a-home-for-sale-in-beverly-hills-ca.jpg?s=612x612&w=0&k=20&c=uSKacMQvmaYX5Pf5Br7pUfErYQbNt_UWXRTjfwrdSDQ=',
        renterName: 'Ahmed ElSayed',
        startDate: new Date('2025-05-10'),
        endDate: new Date('2025-05-20'),
        totalPrice: 1500,
        rating: 4,
        transactionDate: new Date('2025-05-01'),
      },
      {
        propertyTitle: 'Zamalek Studio',
        propertyImageUrl: 'https://www.malabardevelopers.com/wp-content/uploads/2020/01/benefits-of-investing-in-a-villa.jpg',
        renterName: 'Mona Khaled',
        startDate: new Date('2025-06-01'),
        endDate: new Date('2025-06-07'),
        totalPrice: 1000,
        rating: null,
        transactionDate: new Date('2025-05-30'),
      },
    ];

    this.totalProfit = this.history.reduce((sum, item) => sum + item.totalPrice, 0);
  }
}