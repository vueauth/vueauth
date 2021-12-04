import useAuthRedirector from './useAuthRedirector'
import { RouteLocationRaw, Router, useRouter } from 'vue-router'
import { MaybeRef } from '@vueuse/core'
import { ref } from 'vue-demi'
import { UseUnauthenticatedRedirector } from 'auth-composables'

export const useUnauthenticatedRedirector: UseUnauthenticatedRedirector = (
  redirectTo: MaybeRef<RouteLocationRaw> = ref('/'),
  router: Router = useRouter()
) => {
  return {
    ...useAuthRedirector('unauthenticated', redirectTo, router)
  }
}

export default useUnauthenticatedRedirector
