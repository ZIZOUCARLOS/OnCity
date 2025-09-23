class Homepage {
//Navegacion
nav(){
    cy.clearCookies();
        cy.clearLocalStorage();
        cy.viewport(1400, 900);
        cy.visit('https://staging--aremsaprod.myvtex.com/');
}
// // elementos

// inputEmailVtex(){
//     return cy.get('[name="email"]').click().type("carlos.echagarreta@corebiz.ag")
// }
// inputContinuarVtex(){
//     return cy.get('[data-testid="request-email"] > .vtex-button > .vtex-button__label').click()
// }
// InputPassworVtex(){
//     return cy.get('[name="password"]').click().type("Carlos15337039")

// }
// // Home
// botonCp(){
//     return cy.get('.aremsaprod-geo-location-0-x-statusShipping > .aremsaprod-geo-location-0-x-statusShippingButton',{ timeout: 20000 })
// }
// //Flujo reuntilizable
// vtex(){
//     this.inputEmailVtex().click().type("carlos.echagarreta@corebiz.ag")
//     this.inputContinuarVtex().click()
//     this.InputPassworVtex().click().type("Carlos15337039")
//     this.botonCp.click()
//     this.cy.get('.flex-column > .vtex-input > .vtex-input-prefix__group > .vtex-styleguide-9-x-input').click().type()
// }
}
it('entrar a la home', () => {
    cy.clearCookies();
        cy.clearLocalStorage();
        cy.viewport(1400, 900);
 cy.visit('https://staging--aremsaprod.myvtex.com/', { timeout: 15000, failOnStatusCode: false });
 cy.get('[name="email"]').click().type("carlos.echagarreta@corebiz.ag")
 cy.get('[data-testid="request-email"] > .vtex-button > .vtex-button__label').click()
 cy.get('[name="password"]').click().type("Carlos15337039")
 cy.get('.vtex-button__label').click()
 //cy.wait(3000);
 //cy.get('.w-100 > .flex > .bg-transparent').click()
 //cy.get('div.relative > .vtex-button > .vtex-button__label').dblclick()
 //cy.get('.aremsaprod-geo-location-0-x-statusShipping > .aremsaprod-geo-location-0-x-statusShippingButton',{ timeout: 20000 }).click()
 //cy.get('.flex-column > .vtex-input > .vtex-input-prefix__group > .vtex-styleguide-9-x-input').click().type(1407)
});

export default Homepage;