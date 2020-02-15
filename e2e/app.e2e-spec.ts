import { OnedirectFeedbackUiPage } from './app.po';

describe('onedirect-feedback-ui App', () => {
  let page: OnedirectFeedbackUiPage;

  beforeEach(() => {
    page = new OnedirectFeedbackUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Hola Mundo');
  });
});
