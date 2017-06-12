import {TestBed, ComponentFixture, tick, inject, fakeAsync} from '@angular/core/testing';
import {ResponseOptions, Response} from "@angular/http";

import {AppComponent} from './app.component';
import {BookingsService} from "./bookings/bookings.service";

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
    class BookingsServiceStub {
        getServices() {}
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: BookingsService, useClass: BookingsServiceStub }
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
    });

    it('requests played games and achievements for those games from service, stores games played with un-achieved achievements',
        fakeAsync(inject([BookingsService], (bookingsService: BookingsService) => {
            spyOn(bookingsService, 'getServices').and.returnValue(Promise.resolve(new Response(new ResponseOptions({
                body: {
                    _embedded: {
                        services: [
                            {
                                test: 1
                            }, {
                                test: 2
                            }
                        ]
                    }
                }
            }))));

            comp.getServices();
            tick();

            expect(bookingsService.getServices).toHaveBeenCalled();
            expect(comp.services).toEqual([
                {
                    test: 1
                }, {
                    test: 2
                }
            ]);
        })));
});
