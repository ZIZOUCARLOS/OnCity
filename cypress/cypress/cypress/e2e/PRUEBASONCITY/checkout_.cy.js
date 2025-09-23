class checkout{

}
// describe('', () => {
//     cy.visit('https://staging--aremsaprod.myvtex.com/checkout/');
// });

it('Flujo checkout', () => {
    cy.get('.pre-email > .client-email > [name="email"]').click().type("Carlos.echagarreta@corebiz.ag")
    cy.get('.pre-email > .client-email > [name="email"]').click()
    cy.wait(1000);
});

export default checkout