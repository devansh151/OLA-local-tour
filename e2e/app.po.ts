import { browser, by, element } from 'protractor';

export class OnedirectFeedbackUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ola-root h1')).getText();
  }
}
