import {TestBed, async, ComponentFixture, inject} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {MockBackend} from "@angular/http/testing";
import {BaseRequestOptions, Http, HttpModule, ResponseOptions, Response, RequestMethod} from "@angular/http";
import {FormsModule} from "@angular/forms";

let comp: AppComponent;
let fixture: ComponentFixture<AppComponent>;

describe('AppComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                AppComponent
            ],
            imports: [
                HttpModule,
                FormsModule
            ],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend, options) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });

        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;
    });

    it('requests stats from API successfully',
        async(inject([MockBackend], (mockBackend: MockBackend) => {

            let connection = { request: { url: null, method: null }};

            mockBackend.connections.subscribe(conn => {
                conn.mockRespond(new Response(new ResponseOptions({ body: { stats: true }})));
                connection = conn;
            });

            comp.appId = 'appId';
            comp.userId = 'userId';

            comp.getStats();

            expect(connection.request.url).toEqual('http://localhost:5000/stats?appId=appId&userId=userId');
            expect(connection.request.method).toEqual(RequestMethod.Get);
            // expect(comp.stats).toEqual({ stats: true });
        })));
});
