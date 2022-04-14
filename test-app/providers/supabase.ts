import { Provider } from '../src/types/Providers'

const supabase: Provider = {

  /**
   * Supabase
   */
  register: {
    beforeCommand: `
        ts-node ./cypress/support/supabase/deleteJohnSmith.ts
      `,
    hasNameField: false,
    response: {
      action: 'POST',
      urlGlob: 'https://*.supabase.co/**',
      statusCode: 200,
    },
  },
  login: {
    beforeCommand: `
        ts-node ./cypress/support/supabase/deleteJohnSmith.ts &&
        ts-node ./cypress/support/supabase/createJohnSmith.ts
      `,
    response: {
      action: 'POST',
      urlGlob: 'https://*.supabase.co/auth/v1/token**',
      statusCode: 200,
    },
  },
  logout: {
    beforeCommand: `
        ts-node ./cypress/support/supabase/deleteJohnSmith.ts &&
        ts-node ./cypress/support/supabase/createJohnSmith.ts
      `,
    response: {
      action: 'POST',
      urlGlob: 'https://**.supabase.co/auth/v1/logout',
      statusCode: 204,
    },
  },
}

export {
  supabase as default,
  supabase,
}
