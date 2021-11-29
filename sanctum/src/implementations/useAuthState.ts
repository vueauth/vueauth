import getSanctumConfig from '../getSanctumConfig'
import { UseAuthState } from 'auth-composables'

export const useAuthState: UseAuthState = () => {
  const config = getSanctumConfig()
  return config.useAuthState()
}

export default useAuthState
