import { UseUnauthenticatedRedirector, UseUnauthenticatedRedirectorReturn } from '../Contracts/UseUnauthenticatedRedirector'
import { getDefaultProvider } from './getDefaultProvider'
import useFeature from './useFeature'
import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRef } from '@vueuse/core'

const featureId = 'unauthenticatedRedirector'

export const useUnauthenticatedRedirector = (
  authProvider = '',
  redirectTo?: MaybeRef<RouteLocationRaw>,
  router?: Router
) => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }
  return useFeature<UseUnauthenticatedRedirector, UseUnauthenticatedRedirectorReturn>(
    authProvider, featureId, redirectTo, router
  )
}
