import { Component, AfterViewInit } from '@angular/core';

declare const jsVectorMap: any;

@Component({
    selector: 'app-map-card',
    imports: [],
    templateUrl: './map-card.html',
    styleUrl: './map-card.css'
})
export class MapCard implements AfterViewInit {
    ngAfterViewInit(): void {
        try {
            new jsVectorMap({
                map: 'world',
                selector: '#map',
                zoomOnScroll: false,
                zoomButtons: false,
                selectedMarkers: [0, 1],
                markersSelectable: true,
                markers: [
                    { name: 'Palestine', coords: [31.9474, 35.2272] },
                    { name: 'Russia', coords: [61.524, 105.3188] },
                    { name: 'Canada', coords: [56.1304, -106.3468] },
                    { name: 'Greenland', coords: [71.7069, -42.6043] },
                ],
                markerStyle: {
                    initial: { fill: '#16a34a' },
                    selected: { fill: '#94a3b8' },
                },
                labels: {
                    markers: {
                        render: (marker: any) => marker.name,
                    },
                },
            });
        } catch (e) {
            console.error(e);
        }
    }
}