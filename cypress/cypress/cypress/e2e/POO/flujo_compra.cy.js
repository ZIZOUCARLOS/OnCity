// flujo_checkout.cy.js
import CheckoutPage from './element_checkout.js'
import CarritoPage from './elements_car.js'

describe('Flujo completo: Carrito + Checkout con pausa manual', () => {
    const carrito = new CarritoPage();
    const checkout = new CheckoutPage();

    it('Agregar SKUs y finalizar checkout con pausa en medios de pago', () => {

        // --- Paso 1: Navegar al carrito ---
        carrito.navegar();
        carrito.validarUrlCheckout();

        // --- Paso 2: Agregar SKU OnCity ---
        const skus = ["48222"];
        skus.forEach(sku => carrito.agregarSkuAlCarrito(sku));

        // --- Paso 3: Finalizar compra desde el carrito ---
        carrito.finalizarCompra();

        // --- Paso 4: Continuar con checkout ---
        checkout.navegarAcheckout();
        checkout.completarEmailUsuario("carlos.echagarreta@corebiz.ag");
        cy.log('Checkout listo, tarjeta seleccionada (simulada)');

        // // --- Paso 5: Pausa para completar el iframe manualmente ---
        // cy.log('Pausamos aquí para completar los campos de tarjeta manualmente');
        // cy.pause();

        // // --- Paso 6: Finalizar pedido ---
        // checkout.finalizar();
    });
});
