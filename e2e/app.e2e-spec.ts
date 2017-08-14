import { GestionAgenceImmobilierePage } from './app.po';

describe('gestion-agence-immobiliere App', () => {
  let page: GestionAgenceImmobilierePage;

  beforeEach(() => {
    page = new GestionAgenceImmobilierePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
