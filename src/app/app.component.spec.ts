import {TestBed, ComponentFixture, inject, fakeAsync, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ResponseOptions, Response} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {SteamService} from './steam/steam.service';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
    class SteamServiceStub {
        getUserId() {}
        getGamesList() {}
        getAchievements() {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: SteamService, useClass: SteamServiceStub }
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
    });

    it('requests games list from service successfully and stores them',
        fakeAsync(inject([SteamService], (steamService: SteamService) => {
            spyOn(steamService, 'getUserId').and.returnValue(Promise.resolve(new Response(new ResponseOptions({
                body: {
                    response: {
                        steamid: 'userId'
                    }
                }
            }))));
            spyOn(steamService, 'getGamesList').and.returnValue(Promise.resolve(new Response(new ResponseOptions({
                body: {
                    response: {
                        games: 'some games'
                    }
                }
            }))));

            comp.username = 'username';

            comp.getGamesList();
            tick();

            expect(steamService.getUserId).toHaveBeenCalledWith('username');
            expect(steamService.getGamesList).toHaveBeenCalledWith('userId');
            expect(comp.userId).toEqual('userId');
            expect(comp.games).toEqual('some games');
        })));

    it('requests achievement list for given app from service and stores the unachieved ones',
        fakeAsync(inject([SteamService], (steamService: SteamService) => {
            spyOn(steamService, 'getAchievements').and.returnValue(Promise.resolve(new Response(new ResponseOptions({
                body: {
                    playerstats: {
                        achievements: [
                            {
                                name: 'ach1',
                                achieved: 1
                            },
                            {
                                name: 'ach2',
                                achieved: 0
                            }
                        ]
                    }
                }
            }))));

            comp.userId = 'userId';

            comp.getAchievements('appId');
            tick();

            expect(steamService.getAchievements).toHaveBeenCalledWith('appId', 'userId');
            expect(comp.achievements).toEqual([{ name: 'ach2', achieved: 0 }]);
        })));
});
