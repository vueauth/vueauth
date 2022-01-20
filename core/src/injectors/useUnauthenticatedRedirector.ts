import {
  UseUnauthenticatedRedirectorConfig,
  UseUnauthenticatedRedirectorReturn,
} from '../contracts/UseUnauthenticatedRedirector'
import useFeature from './useFeature'

const featureId = 'unauthenticatedRedirector'

export const useUnauthenticatedRedirector = (
  config: UseUnauthenticatedRedirectorConfig = {
    redirectOn: 'unauthenticated',
  },
) => {
  config.redirectOn = 'unauthenticated'
  return useFeature<UseUnauthenticatedRedirectorReturn>(
    featureId, config,
  )
}
