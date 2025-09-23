class car{

}
/// <reference types="cypress" />

describe('Prueba rápida de checkout - 1P', () => {
  beforeEach(() => {
    // Limpiar cookies y almacenamiento local
    cy.clearCookies()
    cy.clearLocalStorage()

    // Configurar tamaño de pantalla
    cy.viewport(1400, 900)

    // Ir directamente al checkout
    cy.visit('https://staging--aremsaprod.myvtex.com/checkout/#/cart')

    // Ignorar errores JS de la página
    Cypress.on('uncaught:exception', () => false)
  })

  it('Agregar SKU manualmente y validar checkout', () => {
    // Validar que estamos en la página de checkout
    cy.url({ timeout: 10000 }).should('include', '/checkout')

    // Esperar que se cargue el contenedor de productos
    cy.get('.flex', { timeout: 10000 }).should('be.visible').click()

    // Seleccionar el primer producto de la lista
    cy.get('.overflow-auto > :nth-child(1) > :nth-child(3)', { timeout: 10000 }).click()

    // Ingresar SKU directamente
    cy.get('#skuIds').should('be.visible').click().type("48222")

    // Click en botón de agregar SKU
    cy.get('.vtex-button > span').click()

    // Confirmar agregado al carrito
    cy.get('.vtex-button').click()

    // Cerrar modal si existe
    cy.get('.dn').then(($el) => {
      if ($el.is(':visible')) {
        cy.wrap($el).click()
      }
    })

    // Ir al checkout final
    cy.get('#cart-to-orderform').click()

    // Validar que el checkout se abre correctamente
    cy.url().should('include', '/checkout')
    cy.get('.cart-item', { timeout: 10000 }).should('exist') // validar que hay productos en carrito

    // Validar popup de error si aparece
    cy.contains('Houston, tenemos un problema').should('exist')
  })
})
export default car