/// <reference types="cypress" />

import getProviders from "../../../getProviders"

const providers = getProviders()

for(const providerString of Object.keys(providers)) {
  const testConfig = providers[providerString].login
  describe(`${providerString}: authenticated redirector`, () => {
    beforeEach(() => {
      indexedDB.deleteDatabase('firebaseLocalStorageDb');
      cy.visit('/')
      cy.dataCy('default-provider-select').select(providerString)
      if(testConfig.beforeCommand) {
        cy.exec(testConfig.beforeCommand)
      }
    })
    
    it('can allow authenticated users and redirect unauthenticated users', () => {
      cy.dataCy('link-redirectIfAuthenticated').click()

      cy.url().should('eq', 'http://localhost:3000/redirect-if-authenticated')

      cy.login(providerString)
  
      cy.dataCy('home-link').click()
  
      cy.dataCy('link-redirectIfAuthenticated').click()
  
      cy.url()
        .should('eq', 'http://localhost:3000/')
    })

    it('can allow unauthenticated users and redirect authenticated users', () => {
      cy.dataCy('link-redirectIfUnauthenticated').click()

      cy.url().should('eq', 'http://localhost:3000/')

      cy.login(providerString)
  
      cy.dataCy('home-link').click()
  
      cy.dataCy('link-redirectIfUnauthenticated').click()
  
      cy.url().should('eq', 'http://localhost:3000/redirect-if-unauthenticated')
    })
  })
}