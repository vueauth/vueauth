import { UseIdentityPasswordRegisterReturn } from 'src/Contracts/UseIdentityPasswordRegister'
import { UseIdentityPasswordRegister } from '../Contracts/UseIdentityPasswordRegister'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'

const featureId = 'identityPassword:register'

export const useIdentityPasswordRegister = (authProvider = '') => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseIdentityPasswordRegister, UseIdentityPasswordRegisterReturn>(
    authProvider, featureId
  )
}
