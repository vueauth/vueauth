import { RedirectTriggers, UseAuthRedirector, UseAuthRedirectorReturn } from '../Contracts/UseAuthRedirector'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'
import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRef } from '@vueuse/core'

const featureId = 'authRedirector'

export const useAuthRedirector = (
  authProvider = '',
  redirectOn: RedirectTriggers,
  redirectTo?: MaybeRef<RouteLocationRaw>,
  router?: Router
) => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseAuthRedirector, UseAuthRedirectorReturn>(
    authProvider, featureId, redirectOn, redirectTo, router
  )
}
