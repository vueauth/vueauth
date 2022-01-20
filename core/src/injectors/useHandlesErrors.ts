import {
  UseHandlesErrorsReturn,
  UseHandlesErrorsConfig,
} from '../contracts/UseHandlesErrors'
import useFeature from './useFeature'

const featureId = 'errorHandler'

export const useHandlesErrors = (
  config: UseHandlesErrorsConfig = {},
) => {
  return useFeature<UseHandlesErrorsReturn>(
    featureId, config,
  )
}
