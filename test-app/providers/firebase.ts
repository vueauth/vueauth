import { Provider } from '../src/types/Providers'

const firebase: Provider = {
  register: {
    beforeCommand: `
        export GOOGLE_APPLICATION_CREDENTIALS="./cypress/support/firebase/quasarv2-firebase-firebase-adminsdk.json" &&
        ts-node ./cypress/support/firebase/deleteJohnSmith.ts
      `,
    hasNameField: false,
    response: {
      action: 'POST',
      urlGlob: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp**',
      statusCode: 200,
    },
  },
  login: {
    beforeCommand: `
        export GOOGLE_APPLICATION_CREDENTIALS="./cypress/support/firebase/quasarv2-firebase-firebase-adminsdk.json" &&
        ts-node ./cypress/support/firebase/deleteJohnSmith.ts &&
        ts-node ./cypress/support/firebase/createJohnSmith.ts
      `,
    response: {
      action: 'POST',
      urlGlob: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup**',
      statusCode: 200,
    },
  },
  logout: {
    beforeCommand: `
        export GOOGLE_APPLICATION_CREDENTIALS="./cypress/support/firebase/quasarv2-firebase-firebase-adminsdk.json" &&
        ts-node ./cypress/support/firebase/deleteJohnSmith.ts &&
        ts-node ./cypress/support/firebase/createJohnSmith.ts
      `,
  },
}

export {
  firebase as default,
  firebase,
}
