/// <reference types="cypress" />

import getProviders from '../../../getProviders'

const providers = getProviders()

for (const providerString of Object.keys(providers)) {
  const testConfigLogin = providers[providerString].login
  const testConfigLogout = providers[providerString].logout
  describe(`${providerString}: logout page`, () => {
    before(() => {
      cy.visit('/')
      cy.dataCy('default-provider-select').select(providerString)
      if (testConfigLogin.beforeCommand) {
        cy.exec(testConfigLogin.beforeCommand)
      }
    })

    it('can logout of an account', () => {
      if (testConfigLogout.response) {
        cy.intercept(testConfigLogout.response.action, testConfigLogout.response.urlGlob)
          .as('logoutRequest')
      }

      const email = 'john@example.com'

      cy.login(providerString)

      cy.dataCy('link-emailPasswordLogin').click()

      cy.dataCy('logout-button').click()

      if (testConfigLogout.response) {
        cy.wait('@logoutRequest')
          .its('response.statusCode')
          .should('eq', testConfigLogout.response.statusCode)
          .then(() => {
            cy.dataCy('auth-state')
              .should('not.contain.text', email)

            cy.reload()
            cy.dataCy('auth-state')
              .should('not.contain.text', email)
          })
      } else {
        cy.dataCy('auth-state')
          .should('not.contain.text', email)

        cy.reload()
        cy.dataCy('auth-state')
          .should('not.contain.text', email)
      }
    })
  })
}
