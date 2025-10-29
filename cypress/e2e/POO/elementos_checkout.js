// element_checkout.cy.js
class CheckoutPage {

    // --- Navegación ---
    navegarAcheckout() {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.viewport(1400, 900);
        // cy.visit('https://aremsaprod.myvtex.com/checkout/#/email');
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
        return cy.get(':nth-child(5) > .react-datepicker__day--029')
    }

    botonDeTarjeta() {
        return cy.contains('label.SavedCard', 'Visa termina con 4905');
    }

    finalizarPedido() {
        return cy.get('.jsSubmitFakeButton');
    }
    mensajehello(){
        return cy.get('.payment-unauthorized-hello')
    }

    // --- Flujos reutilizables ---
    completarEmailUsuario(email) {
        this.inputEmail().should('be.visible').click().type(email);
        this.botonContinuar().click();
        this.popupBotonContinuarCompra().should('be.visible').click();
        this.botonContinuarAlPago().should('be.visible').click();cy.wait(500);
        this.calendario().should('be.visible').click();
        this.botonContinuarAlPago().should('be.visible').click();
    }

    // --- Botón de finalizar compra ---
    finalizar() {
        this.finalizarPedido().click();
        this.mensajehello()
  .invoke('text')
  .then((text) => {
    cy.log('Texto detectado:', text);

    if (text.includes('Por favor, revisa los detalles de pago')) {
      // 🔴 Caso de error
      expect(text).to.include('Por favor, revisa los detalles de pago');
      cy.log('⚠️ La compra falló. Mensaje de error validado correctamente.');
    } else if (text.includes('orderForm')) {
      // ✅ Caso exitoso: se muestra el orderForm
      const match = text.match(/orderForm\s*:\s*(\d+)/);
      if (match) {
        const orderNumber = match[1];
        cy.log('✅ Compra exitosa. Número de orderForm:', orderNumber);
        expect(orderNumber).to.match(/^\d+$/); // valida que sea numérico
      } else {
        throw new Error('No se encontró número de orderForm en el texto.');
      }
    } else {
      // 🟡 Si no aparece ninguno de los dos textos esperados
      throw new Error(`Texto inesperado: ${text}`);
    }
  });

    }
}

export default CheckoutPage;
