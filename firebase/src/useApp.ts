import { inject } from 'vue-demi'
import { FirebaseAppKey } from './types/symbols'

export const useApp = () => {
  const app = inject(FirebaseAppKey)
  if (!app) {
    throw Error('Error injecting firebase app')
  }
  return app
}

export default useApp
