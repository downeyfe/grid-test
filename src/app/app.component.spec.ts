import {TestBed, ComponentFixture, inject, fakeAsync, tick} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ResponseOptions, Response} from '@angular/http';
import {FormsModule} from '@angular/forms';

import {SteamService} from './steam/steam.service';

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
    class SteamServiceStub {
        getStats() {}
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

    it('requests stats from service successfully',
        fakeAsync(inject([SteamService], (steamService: SteamService) => {
            spyOn(steamService, 'getStats').and.returnValue(Promise.resolve(new Response(new ResponseOptions({
                body: {
                    steam: 'stats'
                }
            }))));

            comp.appId = 'appId';
            comp.userId = 'userId';

            comp.getStats();
            tick();

            expect(steamService.getStats).toHaveBeenCalledWith('appId', 'userId');
            expect(comp.stats).toEqual({ steam: 'stats' });
        })));
});
