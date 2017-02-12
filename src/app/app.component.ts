import {Component} from '@angular/core';

import {SteamService} from './steam/steam.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    achievements: Array<Object>;
    appId: string;
    userId: string;

    constructor(private steamService: SteamService) {}

    getAchievements(): void {
        this.steamService
            .getAchievements(this.appId, this.userId)
            .then(response => {
                this.achievements = response.json().playerstats.achievements.filter(value => !value.achieved);
            })
    }
}
