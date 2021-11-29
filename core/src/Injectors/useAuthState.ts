import { AuthState } from '../types'
import { UseAuthState } from '../Contracts/UseAuthState'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'

const featureId = 'authState'

export const useAuthState = (authProvider = '') => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseAuthState, AuthState>(
    authProvider, featureId
  )
}
