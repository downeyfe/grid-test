import {Component} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    stats: Object;
    appId: string;
    userId: string;

    constructor(private http: Http) {}

    getStats(): void {
        this.http.get(`http://localhost:5000/stats?appId=${this.appId}&userId=${this.userId}`)
            .toPromise()
            .then(response => {
                this.stats = response.json();
            })
            .catch(error => {
                console.log('error', error);
            });
    }
}
