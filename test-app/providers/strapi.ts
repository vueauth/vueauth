import { Provider } from '../src/types/Providers'

/**
 * Strapi
 */
const strapiSupportDir = './cypress/support/strapi/'
const strapiCommands = {
  createJohnSmith: `ts-node ${strapiSupportDir}createJohnSmith.ts`,
  clearUsersTable: `ts-node ${strapiSupportDir}clearUsersTable.ts`,
}

const strapi: Provider = {
  register: {
    beforeCommand: strapiCommands.clearUsersTable,
    hasNameField: false,
    hasUsernameField: true,
    response: {
      action: 'POST',
      urlGlob: '**/api/auth/local/register',
      statusCode: 200,
    },
  },
  login: {
    beforeCommand: `${strapiCommands.clearUsersTable} && ${strapiCommands.createJohnSmith}`,
    response: {
      action: 'POST',
      urlGlob: '**/api/auth/local',
      statusCode: 200,
    },
  },
  logout: {
    beforeCommand: `${strapiCommands.clearUsersTable} && ${strapiCommands.createJohnSmith}`,
  },
}

export {
  strapi as default,
  strapi,
}
