// flujo_checkout.cy.js
import CheckoutPage from './elementos_checkout.js'
import CarritoPage from './elements_car.js'

describe('Flujo completo: Carrito + Checkout con pausa manual', () => {
  const carrito = new CarritoPage()
  const checkout = new CheckoutPage()

  it('Flujo con SKU 48222 (seller 1)', () => {
    // --- Paso 1: Navegar al carrito ---
    carrito.navegar()
    carrito.validarUrlCheckout()

    // --- Paso 2: Agregar SKU ---
    carrito.agregarSkuAlCarrito("48222")

    // --- Paso 3: Finalizar compra desde el carrito ---
    carrito.finalizarCompra()

    // --- Paso 4: Continuar con checkout ---
    checkout.navegarAcheckout()
    checkout.completarEmailUsuario("carlos.echagarreta@corebiz.ag")
    cy.log('Checkout listo con SKU 48222')

    // --- Paso 5: Pausa para completar el iframe manualmente ---
    cy.pause()

    // --- Paso 6: Finalizar pedido ---
    checkout.finalizar()

    // // --- Paso 7: Validación del OrderForm ---
    // cy.intercept('POST', '**/api/checkout/pub/orderForm/**').as('crearOrden');
    // cy.wait('@crearOrden').then(({ response }) => {
    //   expect(response.statusCode).to.eq(200);
    //   expect(response.body).to.have.property('orderFormId');
    //   expect(response.body.items).to.have.length.greaterThan(0);
    // });

    // cy.log('Compra finalizada correctamente con OrderForm ✅');
  });
  })
