import { Provider } from '../src/types/Providers'

import artisan from '../cypress/support/sanctum/artisan'

const sanctum: Provider = {

  register: {
    hasNameField: true,
    response: {
      action: 'POST',
      urlGlob: 'http://localhost:3000/sanctum/register',
      statusCode: 201,
    },
  },
  login: {
    beforeCommand: artisan([
      'db:wipe',
      'migrate',
      'db:seed --class=LoginTestSeeder',
    ]),
    response: {
      action: 'GET',
      urlGlob: 'http://localhost:3000/sanctum/api/user',
      statusCode: 200,
    },
  },
  logout: {
    beforeCommand: artisan([
      'db:wipe',
      'migrate',
      'db:seed --class=LoginTestSeeder',
    ]),
    response: {
      action: 'POST',
      urlGlob: 'http://localhost:3000/sanctum/logout',
      statusCode: 204,
    },
  },
}

export {
  sanctum as default,
  sanctum,
}
