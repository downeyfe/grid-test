import {HomePage} from './app.po';

describe('Grid Test App', function () {
    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
        page.navigateTo();
    });

    it('should display correct number of service results', () => {
        page.getServicesCount().then(count => {
            expect(count).toEqual(7);
        });
    });
});
