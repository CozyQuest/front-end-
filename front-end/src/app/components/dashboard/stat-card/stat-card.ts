import { Component, Input, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-stat-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './stat-card.html',
    styleUrl: './stat-card.css'
})
export class StatCard implements AfterViewInit {
    @Input() title: string = '';
    @Input() value: string | number = '';
    @Input() currency?: string;
    @Input() icon: string = '';

    constructor(private el: ElementRef) { }

    ngAfterViewInit(): void {
        this.animateCounter();
    }

    private animateCounter(): void {
        try {
            const counter = this.el.nativeElement.querySelector('.counter-value');
            if (!counter) return;

            const target = +counter.getAttribute('data-target')!;
            let count = 0;
            const speed = 500;

            const updateCount = () => {
                let inc = target / speed;
                if (inc < 1) inc = 1;

                if (count < target) {
                    count += inc;
                    counter.innerHTML = Math.ceil(count).toString();
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerHTML = target.toString();
                }
            };

            updateCount();
        } catch (err) {
            console.error('Error animating counter:', err);
        }
    }
}
