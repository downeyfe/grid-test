import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BookingsService {
    private api: string = 'https://uk.bookingbug.com/api/v1';
    private companyId: string = '41285';
    private path: string = `/${this.companyId}/services`;
    private appId: string = '5a3d8b8d';
    private appKey: string = '738e9aca62e7465446b7be8fe4219ffa';

    constructor(private http: Http) {}

    getServices() {
        const headers = new Headers();
        headers.append('App-Id', this.appId);
        headers.append('App-Key', this.appKey);

        return this.http
            .get(`${this.api}${this.path}`, { headers: headers })
            .toPromise();
    }
}