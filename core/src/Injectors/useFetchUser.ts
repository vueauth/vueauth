import { UseFetchUser, UseFetchUserReturn } from '../Contracts/UseFetchUser'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'

const featureId = 'fetchUser'

export const useFetchUser = (authProvider = '') => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseFetchUser, UseFetchUserReturn>(
    authProvider, featureId
  )
}
