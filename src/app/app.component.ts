import {Component} from '@angular/core';

import {SteamService} from './steam/steam.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    username: string;
    userId: string;
    games: Array<Object>;
    achievements: Array<Object>;

    constructor(private steamService: SteamService) {}

    getGamesList(): void {
        this.steamService
            .getUserId(this.username)
            .then(userResponse => {
                this.userId = userResponse.json().response.steamid;

                this.steamService.getGamesList(this.userId)
                    .then(gamesResponse => {
                        this.games = gamesResponse.json().response.games;
                    })
            });
    }

    getAchievements(appId: string): void {
        this.steamService.getAchievements(appId, this.userId)
            .then(achievementResponse => {
                this.achievements = achievementResponse.json().playerstats.achievements.filter(value => !value.achieved);
            });
    }
}
