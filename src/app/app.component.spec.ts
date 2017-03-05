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
        getAchievements() {}
        getOwnedGames() {}
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

    it('requests played games and achievements for those games from service, stores games played with un-achieved achievements',
        fakeAsync(inject([SteamService], (steamService: SteamService) => {
            spyOn(steamService, 'getUserId').and.returnValue(Promise.resolve(new Response(new ResponseOptions({
                body: {
                    response: {
                        steamid: 'someId'
                    }
                }
            }))));
            spyOn(steamService, 'getOwnedGames').and.returnValue(Promise.resolve(new Response(new ResponseOptions({
                body: {
                    response: {
                        games: [
                            {
                                playtime_forever: 0,
                                appid: 'app1'
                            },
                            {
                                playtime_forever: 100,
                                appid: 'app2'
                            }
                        ]
                    }
                }
            }))));
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

            comp.username = 'username';
            comp.getStats();
            tick();

            expect(steamService.getUserId).toHaveBeenCalledWith('username');
            expect(comp.userId).toEqual('someId');
            expect(steamService.getOwnedGames).toHaveBeenCalledWith('someId');
            expect(steamService.getAchievements).toHaveBeenCalledWith('app2', 'someId');
            expect(comp.games).toEqual([{
                playtime_forever: 100,
                appid: 'app2',
                achievements: [
                    {
                        name: 'ach2',
                        achieved: 0
                    }
                ]
            }]);
        })));
});
