import { inject } from 'vue-demi'
import { FirebaseAppKey } from './types/symbols'

export const useApp = () => {
  return inject(FirebaseAppKey)
}

export default useApp