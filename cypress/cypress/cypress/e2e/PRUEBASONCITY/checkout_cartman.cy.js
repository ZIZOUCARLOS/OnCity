/// <reference types="cypress" />

describe('Checkout usando Cartman - 1P y 3P', () => {

  const token = 'eyJhbGciOiJFUzI1NiIsImtpZCI6IkUwRDJCRUI5M0YwRUVFMURCN0JGMUNGOTkwNEFBRDk1QTQyMDk2Q0QiLCJ0eXAiOiJqd3QifQ.eyJzdWIiOiJjYXJsb3MuZWNoYWdhcnRAY29yZWJpei5hZyIsImFjY291bnQiOiJhcmVtc2Fwcm9kIiwiYXVkaWVuY2UiOiJhZG1pbiIsInNlc3MiOiJiOGU3OTAwZS0zMGZmLTQ4ZDgtYjBhZS00OGE2ZjU1Y2ZhMzIiLCJleHAiOjE3NTY5ODk5OTEsInR5cGUiOiJ1c2VyIiwidXNlcklkIjoiNmVmOGExZTItMWY4ZC00YzQxLTk2NjEtODlkZWVkZDQ3NzZkIiwiaWF0IjoxNzU2OTAzNTkxLCJpc1JlcHJlc2VudGF0aXZlIjpmYWxzZSwiaXNzIjoidG9rZW4tZW1pdHRlciIsImp0aSI6IjA2YjA1ZWRmLWYyYzEtNDg2MS05NmE3LWMwYjA2OWQ5NTNlMiJ9.jwJFCAZp0j9bGwErgAGmiUmuDiqwCODoqYAIY53n634vGB7nfo08fdXLYPOHVvmpf_Y4-sSYQL--0wMCC6d8XA'

  beforeEach(() => {
    // Limpiar cookies y localStorage
    cy.clearCookies()
    cy.clearLocalStorage()

    // Configurar viewport
    cy.viewport(1400, 900)

    // Setear JWT como cookie para VTEX
    cy.setCookie('VtexIdclientAutCookie', token)

    // Ignorar errores JS de la página
    Cypress.on('uncaught:exception', () => false)
  })

  it('Agrega productos 1P y 3P y valida checkout', () => {
    // Cargar SKUs desde fixture
    cy.fixture('cartmanProducts').then((data) => {
      // Mapear productos para VTEX API
      const items = data.productos.map(p => ({
        id: p.sku,
        quantity: p.cantidad,
        seller: "On City"   // Ajuste según tu requerimiento
      }))

      // Agregar productos vía Cartman (API VTEX)
      cy.request({
        method: 'POST',
        url: 'https://staging--aremsaprod.myvtex.com/api/checkout/pub/orderForm/simulation',
        headers: { Cookie: `VtexIdclientAutCookie=${token}` },
        body: { items },
        failOnStatusCode: false
      }).then((response) => {
        cy.log('Status API:', response.status)
        cy.log('Body API:', JSON.stringify(response.body))
      })
    })

    // Ir directo al checkout
    cy.visit('https://staging--aremsaprod.myvtex.com/checkout/#/cart')

    // Validar que los productos están en el carrito
    cy.get('.cart-item', { timeout: 10000 }).should('have.length', 2) // Ajusta selector según tu tienda

    // Validar popup de error si ocurre
    cy.contains('Houston, tenemos un problema').should('exist')
  })
})
