Cypress.Commands.add('home', () => {
  cy.dataCy('home-link').click()
});