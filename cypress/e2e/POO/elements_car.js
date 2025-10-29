class CarritoPage {

    // === Navegación ===
    navegar() {
        cy.clearCookies()
        cy.clearLocalStorage()
        cy.viewport(1400, 900)
        // cy.visit('https://aremsaprod.myvtex.com/checkout/#/email');
        cy.visit('https://staging--aremsaprod.myvtex.com/checkout/#/email');
    }

    validarUrlCheckout() {
        return cy.url({ timeout: 10000 }).should('include', '/checkout')
    }

    // === Elementos ===
    abrirCartman() {
        return cy.get('.flex', { timeout: 20000 }).should('be.visible').click()
    }

    botonAgregarItems() {
        return cy.get('.overflow-auto > :nth-child(1) > :nth-child(3)', { timeout: 10000 }) 
        // ⚠️ Ajusta si tu DOM no tiene data-testid
    }

    campoSku() {
        return cy.get('#skuIds').should('be.visible')
    }

    botonConfirmarAgregar() {
        return cy.get('.vtex-button > span').contains('Agregar') // más robusto
    }

    modalCerrar() {
        return cy.get('.dn').then(($el) => {
            if ($el.is(':visible')) {
                cy.wrap($el).click()
            }
        })
    }

    botonFinalizarCompra() {
        return cy.get('#cart-to-orderform').should('be.visible')
    }

    // validarCheckoutAbierto() {
    //     return cy.url().should('include', '/checkout')
    // }

    // validarItemsEnCheckout() {
    //     return cy.get('.cart-item', { timeout: 10000 }).should('exist')
    // }

    // === Flujos Completos ===
    agregarSkuAlCarrito(sku) {
        this.abrirCartman()
        this.botonAgregarItems().click()
        cy.wait(1000);
        this.campoSku().clear().type(sku)
        this.botonConfirmarAgregar().click()
        this.modalCerrar()
    }

    finalizarCompra() {
        this.botonFinalizarCompra().click()
        //this.validarCheckoutAbierto()
        //this.validarItemsEnCheckout()
    }
}

export default CarritoPage
