import { PhiPhenomenonPage } from './app.po';

describe('phi-phenomenon App', () => {
  let page: PhiPhenomenonPage;

  beforeEach(() => {
    page = new PhiPhenomenonPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
