import {HomePage} from './app.po';

xdescribe('steam-recs App', function () {
    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Steam Recommendations');
    });
});
