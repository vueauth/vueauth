import {
  UseAuthenticatedRedirectorConfig,
  UseAuthenticatedRedirectorReturn,
} from '../contracts/UseAuthenticatedRedirector'
import useFeature from './useFeature'

const featureId = 'authenticatedRedirector'

export const useAuthenticatedRedirector = (
  config: UseAuthenticatedRedirectorConfig = {
    redirectOn: 'authenticated',
  },
) => {
  config.redirectOn = 'authenticated'
  return useFeature<UseAuthenticatedRedirectorReturn>(
    featureId, config,
  )
}
