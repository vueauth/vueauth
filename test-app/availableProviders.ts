import { Providers } from "./src/types/Providers"
import artisan from './cypress/support/sanctum/artisan'

const availableProviders: Providers = {

  /**
   * Firebase
   */
  firebase: {
    register: {
      beforeCommand: `
        export GOOGLE_APPLICATION_CREDENTIALS="./cypress/support/firebase/quasarv2-firebase-firebase-adminsdk.json" &&
        node ./cypress/support/firebase/deleteJohnSmith.js
      `,
      hasNameField: false,
      response: {
        action: 'POST',
        urlGlob: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp**',
        statusCode: 200
      }
    },
    login: {
      beforeCommand: `
        export GOOGLE_APPLICATION_CREDENTIALS="./cypress/support/firebase/quasarv2-firebase-firebase-adminsdk.json" &&
        node ./cypress/support/firebase/deleteJohnSmith.js &&
        node ./cypress/support/firebase/createJohnSmith.js
      `,
      response: {
        action: 'POST',  
        urlGlob: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup**',
        statusCode: 200
      }
    },
    logout: {
      beforeCommand: `
        export GOOGLE_APPLICATION_CREDENTIALS="./cypress/support/firebase/quasarv2-firebase-firebase-adminsdk.json" &&
        node ./cypress/support/firebase/deleteJohnSmith.js &&
        node ./cypress/support/firebase/createJohnSmith.js
      `
    }
  },

  /**
   * Supabase
   */
  supabase: {
    register: {
      beforeCommand: `
        node ./cypress/support/supabase/deleteJohnSmith.js
      `,
      hasNameField: false,
      response: {
        action: 'POST',
        urlGlob: 'https://*.supabase.co/**',
        statusCode: 200
      }
    },
    login: {
      beforeCommand: `
        node ./cypress/support/supabase/deleteJohnSmith.js &&
        node ./cypress/support/supabase/createJohnSmith.js
      `,
      response: {
        action: 'POST',  
        urlGlob: 'https://*.supabase.co/auth/v1/token**',
        statusCode: 200
      }
    },
    logout: {
      beforeCommand: `
        node ./cypress/support/supabase/deleteJohnSmith.js &&
        node ./cypress/support/supabase/createJohnSmith.js
      `,
      response: {
        action: 'POST',  
        urlGlob: 'https://**.supabase.co/auth/v1/logout',
        statusCode: 204
      }
    }
  },

  /**
   * Sanctum
   */
  sanctum: {
    register: {
      hasNameField: true,
      response: {
        action: 'POST',
        urlGlob: 'http://localhost:3000/sanctum/register',
        statusCode: 201
      }
    },
    login: {
      beforeCommand: artisan([
        'db:wipe',
        'migrate',
        'db:seed --class=LoginTestSeeder'
      ]),
      response: {      
        action: 'GET',  
        urlGlob: 'http://localhost:3000/sanctum/api/user',
        statusCode: 200
      }
    },
    logout: {
      beforeCommand: artisan([
        'db:wipe',
        'migrate',
        'db:seed --class=LoginTestSeeder'
      ]),
      response: {        
        action: 'POST',  
        urlGlob: 'http://localhost:3000/sanctum/logout',
        statusCode: 204
      }
    }
  }
}

export {
  availableProviders as default,
  availableProviders
}