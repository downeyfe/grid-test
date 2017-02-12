import {TestBed, inject, async} from '@angular/core/testing';
import {ResponseOptions, Response, RequestMethod, BaseRequestOptions, Http, HttpModule} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {SteamService} from './steam.service';

describe('Steam service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SteamService,
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                },
            ],
            imports: [
                HttpModule
            ]
        });
    });

    it('retrieves stats from API',
        async(inject([SteamService, MockBackend], (service: SteamService, mockBackend: MockBackend) => {

            let connection = { request: { url: null, method: null }};

            mockBackend.connections.subscribe(conn => {
                conn.mockRespond(new Response(new ResponseOptions({})));
                connection = conn;
            });

            service.getAchievements('appId', 'userId').then(() => {
                expect(connection.request.url).toEqual('http://localhost:5000/achievements?appId=appId&userId=userId');
                expect(connection.request.method).toEqual(RequestMethod.Get);
            });
        })));
});
