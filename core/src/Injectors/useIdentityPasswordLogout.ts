import { UseIdentityPasswordLogoutReturn } from 'src/Contracts/UseIdentityPasswordLogout'
import { UseIdentityPasswordLogout } from '../Contracts/UseIdentityPasswordLogout'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'

const featureId = 'identityPassword:logout'

export const useIdentityPasswordLogout = (authProvider = '') => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseIdentityPasswordLogout, UseIdentityPasswordLogoutReturn>(
    authProvider, featureId
  )
}
