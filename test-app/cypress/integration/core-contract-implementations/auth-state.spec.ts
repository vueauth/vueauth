/// <reference types="cypress" />

import getProviders from '../../../getProviders'

const providers = getProviders()

for (const providerString of Object.keys(providers)) {
  const testConfig = providers[providerString].login
  describe(`${providerString}: authenticated redirector`, () => {
    beforeEach(() => {
      cy.visit('/')
      cy.dataCy('default-provider-select').select(providerString)
      if (testConfig.beforeCommand) {
        cy.exec(testConfig.beforeCommand)
      }
    })

    it('correctly displays an unauthenticated users auth state', () => {
      cy.dataCy('link-authState').click()

      cy.dataCy('auth-state')
        .contains('"isAuthenticated": false')
        .contains('"user": null')
    })

    it('correctly displays an authenticated users auth state', () => {
      cy.login(providerString)
      cy.dataCy('link-authState').click()

      cy.dataCy('auth-state')
        .contains('"isAuthenticated": true')
        .contains('john@example.com')
    })
  })
}
