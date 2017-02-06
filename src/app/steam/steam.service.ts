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

    getStats(appId: string, userId: string): Promise<Response> {
        return this.http
            .get(`${this.api}/stats?appId=${appId}&userId=${userId}`)
            .toPromise();
    }
}