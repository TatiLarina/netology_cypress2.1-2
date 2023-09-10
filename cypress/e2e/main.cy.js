import sels from '../fixtures/selectors.json'

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
    let time;

    cy.get(sels.seancesTime).each(element => {
      time = Number(element.text(0, 2));
      if (hours >= time) {
      //  console.log(time);
        expect(element).to.have.class('acceptin-button-disabled');
      }

    });
  })
})