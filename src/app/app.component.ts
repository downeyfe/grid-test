import {Component} from '@angular/core';

import {SteamService} from './steam/steam.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    stats: Object;
    appId: string;
    userId: string;

    constructor(private steamService: SteamService) {}

    getStats(): void {
        this.steamService
            .getStats(this.appId, this.userId)
            .then(response => {
                this.stats = response.json();
            })
    }
}
