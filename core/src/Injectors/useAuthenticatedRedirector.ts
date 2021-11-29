import { UseAuthenticatedRedirector, UseAuthenticatedRedirectorReturn } from '../Contracts/UseAuthenticatedRedirector'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'
import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRef } from '@vueuse/core'

const featureId = 'authenticatedRedirector'

export const useAuthenticatedRedirector = (
  authProvider = '',
  redirectTo?: MaybeRef<RouteLocationRaw>,
  router?: Router
) => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseAuthenticatedRedirector, UseAuthenticatedRedirectorReturn>(
    authProvider, featureId, redirectTo, router
  )
}
