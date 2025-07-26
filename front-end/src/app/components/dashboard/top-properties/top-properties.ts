import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-top-properties',
    imports: [CommonModule],
    templateUrl: './top-properties.html',
    styleUrl: './top-properties.css'
})
export class TopProperties {
    properties = [
        {
            img: 'assets/images/property/1.jpg',
            name: 'House',
            location: 'Baton Rouge, USA',
            change: '-11%',
            isDown: true
        },
        {
            img: 'assets/images/property/2.jpg',
            name: 'House',
            location: 'Baton Rouge, USA',
            change: '+20%',
            isDown: false
        },
        {
            img: 'assets/images/property/3.jpg',
            name: 'House',
            location: 'Baton Rouge, USA',
            change: '+24%',
            isDown: false
        },
        {
            img: 'assets/images/property/4.jpg',
            name: 'House',
            location: 'Baton Rouge, USA',
            change: '+21%',
            isDown: false
        },
        {
            img: 'assets/images/property/5.jpg',
            name: 'House',
            location: 'Baton Rouge, USA',
            change: '+45%',
            isDown: false
        },
    ];

}
