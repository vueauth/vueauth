import {
  UseIdentityPasswordLoginReturn,
  UseIdentityPasswordLoginConfig,
} from '../contracts/UseIdentityPasswordLogin'
import useFeature from './useFeature'

const featureId = 'identityPassword:login'

export const useIdentityPasswordLogin = (
  config: UseIdentityPasswordLoginConfig = {},
) => {
  return useFeature<UseIdentityPasswordLoginReturn>(
    featureId,
    config,
  )
}
