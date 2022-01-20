import {
  UseIdentityPasswordLogoutReturn,
  UseIdentityPasswordLogoutConfig,
} from '../contracts/UseIdentityPasswordLogout'
import useFeature from './useFeature'

const featureId = 'identityPassword:logout'

export const useIdentityPasswordLogout = (
  config: UseIdentityPasswordLogoutConfig = {},
) => {
  return useFeature<UseIdentityPasswordLogoutReturn>(
    featureId, config,
  )
}
