import { Provider } from '../src/types/Providers'

const indexeddb: Provider = {
  register: {
    beforeCommand: '',
    hasNameField: true,
    hasUsernameField: true,
  },
  login: {
    beforeCommand: '',
  },
  logout: {
    beforeCommand: '',
  },
}

export {
  indexeddb as default,
  indexeddb,
}
