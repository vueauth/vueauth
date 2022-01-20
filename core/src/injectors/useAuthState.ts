import { AuthState } from '../types'
import { UseAuthStateConfig } from '../contracts/UseAuthState'
import useFeature from './useFeature'

const featureId = 'authState'

export const useAuthState = (
  config: UseAuthStateConfig = {},
) => {
  return useFeature<AuthState>(
    featureId, config,
  )
}
