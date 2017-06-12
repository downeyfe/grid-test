import {Component} from '@angular/core';

import {BookingsService} from './bookings/bookings.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    services: Array<Object>;

    constructor(private bookingsService: BookingsService) {}

    getServices(): void {
        this.bookingsService
            .getServices()
            .then(response => {
                this.services = response.json()._embedded.services;
            });
    }
}
