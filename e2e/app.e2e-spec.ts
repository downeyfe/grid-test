import { SteamRecsPage } from './app.po';

describe('steam-recs App', function() {
  let page: SteamRecsPage;

  beforeEach(() => {
    page = new SteamRecsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
