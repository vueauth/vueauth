import useAuthRedirector from './useAuthRedirector'
import { RouteLocationRaw, Router, useRouter } from 'vue-router'
import { MaybeRef } from '@vueuse/core'
import { UseUnauthenticatedRedirector } from 'auth-composables'
import { ref } from 'vue-demi'

export const useUnauthenticatedRedirector: UseUnauthenticatedRedirector = (
  redirectTo: MaybeRef<RouteLocationRaw> = ref('/'),
  router: Router = useRouter(),
) => {
  return {
    ...useAuthRedirector('unauthenticated', redirectTo, router),
  }
}

export default useUnauthenticatedRedirector
