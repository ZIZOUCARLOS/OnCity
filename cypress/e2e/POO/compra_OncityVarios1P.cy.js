// flujo_checkout.cy.js
import CheckoutPage from './elementos_checkout.js'
import CarritoPage from './elements_car.js'

describe('Flujo completo: Carrito + Checkout con pausa manual', () => {
  const carrito = new CarritoPage()
  const checkout = new CheckoutPage()

  it('Flujo de compras varios productos 1p', () => {
      // --- Paso 1: Navegar al carrito ---
    carrito.navegar()
    carrito.validarUrlCheckout()

    // --- Paso 2: Agregar SKU ---
    carrito.agregarSkuAlCarrito("53078, 53079 ")
    // 53079

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
    checkout.mensajehello()
  });
  })
