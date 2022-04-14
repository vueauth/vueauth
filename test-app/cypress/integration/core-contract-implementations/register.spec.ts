/// <reference types="cypress" />

import getProviders from '../../../getProviders'

const providers = getProviders()

for (const providerString of Object.keys(providers)) {
  const testConfig = providers[providerString].register
  describe(`${providerString}: register page`, () => {
    before(() => {
      cy.visit('/')
      cy.dataCy('default-provider-select').select(providerString)
      cy.dataCy('link-emailPasswordRegister').click()
      if (testConfig.beforeCommand) {
        cy.exec(testConfig.beforeCommand)
      }
    })

    it('can register an account', () => {
      const registerResponse = testConfig.response

      cy.intercept(registerResponse.action, registerResponse.urlGlob)
        .as('registerRequest')

      const email = createRandomEmail()

      if (testConfig.hasUsernameField) {
        cy.dataCy('username-input').type('johnny123')
      }

      if (testConfig.hasNameField) {
        cy.dataCy('name-input').type('John Smith')
      }

      cy.dataCy('email-input').type(email)
      cy.dataCy('password-input').type('asdfasdf')
      cy.dataCy('password-confirmation-input').type('asdfasdf')

      cy.dataCy('register-button')
        .click()

      cy.wait('@registerRequest')
        .its('response.statusCode')
        .should('eq', registerResponse.statusCode)
        .then(() => {
          cy.dataCy('auth-state')
            .should('contain.text', email)
        })
    })
  })
}

function createRandomEmail () {
  const r = (Math.random() + 1).toString(36).substring(7)
  return r + '@example.com'
}
