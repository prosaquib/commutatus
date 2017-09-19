import { CommutatusPage } from './app.po';

describe('commutatus App', () => {
  let page: CommutatusPage;

  beforeEach(() => {
    page = new CommutatusPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
