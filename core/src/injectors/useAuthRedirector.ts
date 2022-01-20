import {
  redirectTriggers,
  UseAuthRedirectorConfig,
  UseAuthRedirectorReturn,
} from '../contracts/UseAuthRedirector'
import useFeature from './useFeature'
const featureId = 'authRedirector'

export const useAuthRedirector = (
  config: UseAuthRedirectorConfig,
) => {
  if (!config.redirectOn || !redirectTriggers.includes(config.redirectOn)) {
    throw new Error("useAuthRedirector config: 'redirectOn' is either missing or invalid")
  }
  return useFeature<UseAuthRedirectorReturn>(
    featureId, config,
  )
}
