import {TestBed, inject, async} from '@angular/core/testing';
import {ResponseOptions, Response, RequestMethod, BaseRequestOptions, Http, HttpModule} from '@angular/http';
import {MockBackend} from '@angular/http/testing';

import {BookingsService} from './bookings.service';

describe('Bookings service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                BookingsService,
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

    it('retrieves services list from API',
        async(inject([BookingsService, MockBackend], (service: BookingsService, mockBackend: MockBackend) => {

            let connection = { request: { url: null, method: null }};

            mockBackend.connections.subscribe(conn => {
                conn.mockRespond(new Response(new ResponseOptions({})));
                connection = conn;
            });

            service.getServices().then(() => {
                expect(connection.request.url).toEqual('https://uk.bookingbug.com/api/v1/41285/services');
                expect(connection.request.method).toEqual(RequestMethod.Get);
                expect(connection.request.headers.get('App-Id')).toEqual('5a3d8b8d');
                expect(connection.request.headers.get('App-Key')).toEqual('738e9aca62e7465446b7be8fe4219ffa');
            });
        })));
});
