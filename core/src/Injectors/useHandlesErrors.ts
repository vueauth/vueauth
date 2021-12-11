import { UseHandlesErrorsReturn, UseHandlesErrors } from '../Contracts/UseHandlesErrors'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'

const featureId = 'errorHandler'

export const useHandlesErrors = (authProvider = '') => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseHandlesErrors, UseHandlesErrorsReturn>(
    authProvider, featureId
  )
}
