import { UseUpdatePassword, UseUpdatePasswordReturn } from '../Contracts/UseUpdatePassword'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'

const featureId = 'updatePassword'

export const useUpdatePassword = (authProvider = '') => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseUpdatePassword, UseUpdatePasswordReturn>(
    authProvider, featureId
  )
}
