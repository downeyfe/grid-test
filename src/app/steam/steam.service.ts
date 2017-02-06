import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SteamService {
    api: string = 'http://localhost:5000';

    constructor(private http: Http) {}

    getStats(appId: string, userId: string): Promise<Response> {
        return this.http
            .get(`${this.api}/stats?appId=${appId}&userId=${userId}`)
            .toPromise();
    }
}