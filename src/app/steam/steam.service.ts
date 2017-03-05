import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {environment} from "../../environments/environment";

@Injectable()
export class SteamService {
    api: string;

    constructor(private http: Http) {
        this.api = environment.api;
    }

    getUserId(username: string): Promise<Response> {
        return this.http
            .get(`${this.api}/ISteamUser/ResolveVanityURL/v0001?vanityurl=${username}`)
            .toPromise();
    }

    getAchievements(appId: string, userId: string): Promise<Response> {
        return this.http
            .get(`${this.api}/ISteamUserStats/GetPlayerAchievements/v0001?appid=${appId}&steamid=${userId}&l=en`)
            .toPromise();
    }

    getOwnedGames(userId: string): Promise<Response> {
        return this.http
            .get(`${this.api}/IPlayerService/GetOwnedGames/v0001?steamid=${userId}&include_appinfo=1&include_played_free_games=1`)
            .toPromise();
    }
}