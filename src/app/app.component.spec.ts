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

    it('requests achievements from service successfully and stores those that are not achieved',
        fakeAsync(inject([SteamService], (steamService: SteamService) => {
            spyOn(steamService, 'getUserId').and.returnValue(Promise.resolve(new Response(new ResponseOptions({
                body: {
                    response: {
                        steamid: 'userId'
                    }
                }
            }))));
            spyOn(steamService, 'getAchievements').and.returnValue(Promise.resolve(new Response(new ResponseOptions({
                body: {
                    playerstats: {
                        achievements: [
                            {
                                apiname: 'name1',
                                achieved: 1
                            },
                            {
                                apiname: 'name2',
                                achieved: 0
                            }
                        ]
                    }
                }
            }))));

            comp.appId = 'appId';
            comp.username = 'username';

            comp.getAchievements();
            tick();

            expect(steamService.getUserId).toHaveBeenCalledWith('username');
            expect(steamService.getAchievements).toHaveBeenCalledWith('appId', 'userId');
            expect(comp.userId).toEqual('userId');
            expect(comp.achievements).toEqual([{ apiname: 'name2', achieved: 0 }]);
        })));
});
