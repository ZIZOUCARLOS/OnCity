/// <reference types="cypress" />

describe('Abrir WS MGQA', () => {

    it('Navega al checkout del WS de DEV', () => {
        // Limpiar cookies y local storage
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.viewport(1400, 900);

        // Abrir checkout directamente en MGQA
        cy.visit('https://mgqa.myvtex.com/checkout/#/cart');

        // Validar que estamos en el checkout
        cy.url().should('include', '/checkout');
        cy.contains('Checkout').should('be.visible'); // Ajusta según texto visible en tu checkout
    });

});
export default QA