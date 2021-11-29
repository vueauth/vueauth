import { UseIdentityPasswordLoginReturn } from 'src/Contracts/UseIdentityPasswordLogin'
import { UseIdentityPasswordLogin } from '../Contracts/UseIdentityPasswordLogin'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'

const featureId = 'identityPassword:login'

export const useIdentityPasswordLogin = (authProvider = '') => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseIdentityPasswordLogin, UseIdentityPasswordLoginReturn>(
    authProvider, featureId
  )
}
