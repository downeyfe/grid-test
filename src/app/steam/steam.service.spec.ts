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

    it('retrieves 64bit ID from API',
        async(inject([SteamService, MockBackend], (service: SteamService, mockBackend: MockBackend) => {

            let connection = { request: { url: null, method: null }};

            mockBackend.connections.subscribe(conn => {
                conn.mockRespond(new Response(new ResponseOptions({})));
                connection = conn;
            });

            service.getUserId('username').then(() => {
                expect(connection.request.url).toEqual('http://localhost:5000/steam-proxy/ISteamUser/ResolveVanityURL/v0001?vanityurl=username');
                expect(connection.request.method).toEqual(RequestMethod.Get);
            });
        })));

    it('retrieves achievements from API',
        async(inject([SteamService, MockBackend], (service: SteamService, mockBackend: MockBackend) => {

            let connection = { request: { url: null, method: null }};

            mockBackend.connections.subscribe(conn => {
                conn.mockRespond(new Response(new ResponseOptions({})));
                connection = conn;
            });

            service.getAchievements('appId', 'userId').then(() => {
                expect(connection.request.url).toEqual('http://localhost:5000/steam-proxy/ISteamUserStats/GetPlayerAchievements/v0001?appid=appId&steamid=userId&l=en');
                expect(connection.request.method).toEqual(RequestMethod.Get);
            });
        })));

    it('retrieves owned games from API',
        async(inject([SteamService, MockBackend], (service: SteamService, mockBackend: MockBackend) => {

            let connection = { request: { url: null, method: null }};

            mockBackend.connections.subscribe(conn => {
                conn.mockRespond(new Response(new ResponseOptions({})));
                connection = conn;
            });

            service.getOwnedGames('userId').then(() => {
                expect(connection.request.url).toEqual('http://localhost:5000/steam-proxy/IPlayerService/GetOwnedGames/v0001?steamid=userId&include_appinfo=1');
                expect(connection.request.method).toEqual(RequestMethod.Get);
            });
        })));
});
