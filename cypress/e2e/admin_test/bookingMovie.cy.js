import login from '../../fixtures/login.json'
import sels from '../../fixtures/selectors.json'

describe("booking Movie", () => {
    beforeEach(() => {
        cy.visit('/admin'); 
        cy.login(login.login, login.password);
    })

    it("booking movie", () => {
        cy.get(sels.adminMovie)
        .first()
        .invoke("text")
        .then((text) => {
            cy.visit("http://qamid.tmweb.ru");
            cy.get(sels.tomorrow).click();
            cy.get(sels.bookMovie).first().should("have.text", text);
            cy.get(sels.seancesTime).first().click();
            cy.get(sels.seat).click();
            cy.contains("Забронировать").click();
            cy.contains("Получить код бронирования").should("be.visible");
        });
    })

})