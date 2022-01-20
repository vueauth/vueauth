import {
  UseFetchUserConfig,
  UseFetchUserReturn,
} from '../contracts/UseFetchUser'
import useFeature from './useFeature'

const featureId = 'fetchUser'

export const useFetchUser = (
  config: UseFetchUserConfig = {},
) => {
  return useFeature<UseFetchUserReturn>(
    featureId, config,
  )
}
