import {HomePage} from './app.po';

xdescribe('Grid Test App', function () {
    let page: HomePage;

    beforeEach(() => {
        page = new HomePage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Hello world');
    });
});
