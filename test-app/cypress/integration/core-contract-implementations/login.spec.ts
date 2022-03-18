/// <reference types="cypress" />

import getProviders from "../../../getProviders"
const providers = getProviders()

for(const providerString of Object.keys(providers)) {
  const testConfig = providers[providerString].login
  describe(`${providerString}: login page`, () => {
    before(() => {
      indexedDB.deleteDatabase('firebaseLocalStorageDb');
      cy.visit('/')
      cy.dataCy('default-provider-select').select(providerString)
      cy.dataCy('link-emailPasswordLogin').click()
      if(testConfig.beforeCommand) {
        cy.exec(testConfig.beforeCommand)
      }
    })
    
    it('can login to an account', () => {
      cy.intercept(testConfig.response.action, testConfig.response.urlGlob)
        .as('loginRequest')
  
      const email = 'john@example.com'

      cy.dataCy('email-input').type(email)
      cy.dataCy('password-input').type('asdfasdf')
  
      cy.dataCy('login-button')
        .click()
  
      cy.wait('@loginRequest')
        .its('response.statusCode')
        .should('eq', testConfig.response.statusCode)
        .then(() => {
          cy.dataCy('auth-state')
            .should('contain.text', email)
        })
    })
  })
}