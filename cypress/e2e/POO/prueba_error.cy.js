import CheckoutPage from './elementos_checkout.js'
import CarritoPage from './elements_car.js'

describe('Pruebas Checkout con Page Objects', () => {

    const carrito = new CarritoPage();
    const checkout = new CheckoutPage();
    const email = "carlos.echagarreta@corebiz.ag";

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.viewport(1400, 900);
        cy.visit('https://mgqa.myvtex.com/checkout/#/cart');
    });

    it('Flujo con SKU 48222 (seller 1) y manejo de errores', () => {

        // Interceptar y mockear la llamada al conector
        cy.intercept(
            'GET',
            'https://errorsconector40632831--mgqa.myvtex.com/_v/oncity-connector/v1/payments/redirect/*',
            { statusCode: 200, body: { success: true } } // simula éxito
        ).as('oncityConnector');

        // Agregar SKU y finalizar compra (dispara la llamada al conector)
        carrito.agregarSkuAlCarrito("102");
        carrito.finalizarCompra();

        // Completar email
        checkout.completarEmailUsuario(email);

        // Esperar la llamada al conector y validar
        cy.wait('@oncityConnector').then((interception) => {
            console.log('Llamado al conector:', interception);
            expect(interception.response.statusCode).to.be.oneOf([200, 500]);
        });

    });
});
