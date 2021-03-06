import {Component, OnInit} from '@angular/core';

import {BookingsService} from './bookings/bookings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
    services: Array<Object>;

    constructor(private bookingsService: BookingsService) {}

    ngOnInit() {
        this.getServices();
    }

    getServices(): void {
        this.bookingsService
            .getServices()
            .then(response => {
                this.services = response.json()._embedded.services;
            });
    }

    transformPrice(price: number): string {
        return (price / 100 || 0).toFixed(2);
    }
}
