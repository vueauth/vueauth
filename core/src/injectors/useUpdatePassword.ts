import {
  UseUpdatePasswordReturn,
  UseUpdatePasswordConfig,
} from '../contracts/UseUpdatePassword'
import useFeature from './useFeature'

const featureId = 'updatePassword'

export const useUpdatePassword = (
  config: UseUpdatePasswordConfig = {},
) => {
  return useFeature<UseUpdatePasswordReturn>(
    featureId, config,
  )
}
