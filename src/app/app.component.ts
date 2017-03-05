import {Component} from '@angular/core';

import {SteamService} from './steam/steam.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    games: Array<Object>;
    appId: string;
    username: string;
    userId: string;

    constructor(private steamService: SteamService) {}

    getStats(): void {
        this.steamService
            .getUserId(this.username)
            .then(response => {
                this.userId = response.json().response.steamid;

                this.steamService
                    .getOwnedGames(this.userId)
                    .then(response => {
                        this.games = response.json().response.games
                            .filter(game => game.playtime_forever)
                            .map(game => this.getAchievementsForGame(game));

                    });
            });
    }

    private getAchievementsForGame(game: any): Object {
        this.steamService
            .getAchievements(game.appid, this.userId)
            .then(response => {
                game.achievements = (response.json().playerstats.achievements || [])
                    .filter(achievement => !achievement.achieved);
            });

        return game;
    }
}
