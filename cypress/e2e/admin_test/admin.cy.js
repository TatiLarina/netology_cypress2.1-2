import login from '../../fixtures/login.json'
import sels from '../../fixtures/selectors.json'

describe('test admin', () => {
    beforeEach(() => {
        cy.visit('/admin'); 
    })

    it('success autorization', () => {
      cy.login(login.login, login.password);
      cy.get(sels.subtitle).should('have.text', 'Администраторррская');
    })

    it('wrong autorization', () => {
      cy.login(login.wrongLogin, login.wrongPassword);
      cy.contains('Ошибка авторизации!').should('be.visible');
    })
  })