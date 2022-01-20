import availableProviders from "../../availableProviders";

Cypress.Commands.add('login', (providerString: string) => {
  const responseConfig = availableProviders[providerString].login.response

  cy.intercept(responseConfig.action, responseConfig.urlGlob)
    .as('loginRequest')

  cy.home()
  cy.dataCy('link-emailPasswordLogin').click()

  const email = 'john@example.com'

  cy.dataCy('email-input').type(email)
  cy.dataCy('password-input').type('asdfasdf')

  cy.dataCy('login-button')
    .click()

  cy.wait('@loginRequest')
    .then(() => {
      cy.home()
    })
});