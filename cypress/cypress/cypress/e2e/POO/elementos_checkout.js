// element_checkout.cy.js
class CheckoutPage {

    // --- Navegación ---
    navegarAcheckout() {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.viewport(1400, 900);
        cy.visit('https://staging--aremsaprod.myvtex.com/checkout/#/email');
    }

    // --- Elementos ---
    inputEmail() {
        return cy.get('.pre-email > .client-email > [name="email"]');
    }

    botonContinuar() {
        return cy.get('#btn-client-pre-email');
    }

    popupBotonContinuarCompra() {
        return cy.get('#btn-identified-user-button');
    }

    botonContinuarAlPago() {
        return cy.get('#btn-go-to-payment');
    }

    calendario() {
        return cy.get('.react-datepicker__day--020');
    }

    botonDeTarjeta() {
        return cy.contains('label.SavedCard', 'Visa termina con 4905');
    }

    finalizarPedido() {
        return cy.get('.jsSubmitFakeButton');
    }

    // --- Flujos reutilizables ---
    completarEmailUsuario(email) {
        this.inputEmail().should('be.visible').click().type(email);
        this.botonContinuar().click();
        this.popupBotonContinuarCompra().should('be.visible').click();
        this.botonContinuarAlPago().should('be.visible').click();
        this.calendario().should('be.visible').click();
        this.botonContinuarAlPago().should('be.visible').click();
    }

    // --- Botón de finalizar compra ---
    finalizar() {
        this.finalizarPedido().click();
    }
}

export default CheckoutPage;
