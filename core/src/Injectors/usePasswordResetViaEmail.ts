import { UsePasswordResetViaEmailReturn, UsePasswordResetViaEmail } from 'src/Contracts/UsePasswordResetViaEmail'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'

const featureId = 'passwordResetViaEmail'

export const usePasswordResetViaEmail = (authProvider = '') => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UsePasswordResetViaEmail, UsePasswordResetViaEmailReturn>(
    authProvider, featureId
  )
}
