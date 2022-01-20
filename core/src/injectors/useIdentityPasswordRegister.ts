import {
  UseIdentityPasswordRegisterReturn,
  UseIdentityPasswordRegisterConfig,
} from '../contracts/UseIdentityPasswordRegister'
import useFeature from './useFeature'

const featureId = 'identityPassword:register'

export const useIdentityPasswordRegister = (
  config: UseIdentityPasswordRegisterConfig = {},
) => {
  return useFeature<UseIdentityPasswordRegisterReturn>(
    featureId, config,
  )
}
