// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      dataCy(value: string): Chainable<Element>

      /**
       * Login as John Smith
       * @example cy.login()
       */
      login(providerString): void

      /**
       * Click on the 'home' link to go to the home page
       * @example cy.home()
       */
       home(): void
    }
  }
}

import './dataCy'
import './login'
import './home'