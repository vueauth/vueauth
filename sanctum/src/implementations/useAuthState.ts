import getSanctumConfig from '../getSanctumConfig'
import { UseAuthState } from '@vueauth/core'

const useAuthState: UseAuthState = () => {
  const config = getSanctumConfig()
  return config.useAuthState()
}

export {
  useAuthState as default,
  useAuthState,
}
