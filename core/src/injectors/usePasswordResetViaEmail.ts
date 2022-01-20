import {
  UsePasswordResetViaEmailReturn,
  UsePasswordResetViaEmailConfig,
} from '../contracts/UsePasswordResetViaEmail'
import useFeature from './useFeature'

const featureId = 'passwordResetViaEmail'

export const usePasswordResetViaEmail = (
  config: UsePasswordResetViaEmailConfig = {},
) => {
  return useFeature<UsePasswordResetViaEmailReturn>(
    featureId, config,
  )
}
