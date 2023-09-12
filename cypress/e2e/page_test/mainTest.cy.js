import sels from '../../fixtures/selectors.json'

const today = new Date();
const day = today.getDate();
const hours = today.getHours();

describe('test main page', () => {
  beforeEach(() => {
    cy.visit('/'); 
  })

  it('Навигация по дням', () => {
    cy.get(sels.navDay).should('have.length', 7);
  })

  it('Проверка сегодняшнего числа', () => {
    cy.get(sels.navDayNumber).eq(0).should('have.text', day);
  })

  it('Блокировка недоступных по времени кнопок', () => {
    let timeString;

    cy.get(sels.seancesTime).each(element => {
      timeString = element.text();
      const indOfColon = timeString.indexOf(':');
      const timeNumber = Number(timeString.slice(0, indOfColon));
      if (hours >= timeNumber) { 
        // если будет строго больше то например в 15.24 сеанс в 15.00 не будет удовлетворять условию 
        // а кнопка фактически блокируется и должна блокироваться, сеанс ведь начался
        // console.log(timeNumber);
        expect(element).to.have.class('acceptin-button-disabled');
      }
    });
  })
})