import useAuthRedirector from './useAuthRedirector'
import { RouteLocationRaw, Router, useRouter } from 'vue-router'
import { MaybeRef } from '@vueuse/core'
import { UseAuthenticatedRedirector } from 'auth-composables'
import { ref } from 'vue-demi'

export const useAuthenticatedRedirector: UseAuthenticatedRedirector = (
  redirectTo: MaybeRef<RouteLocationRaw> = ref('/'),
  router: Router = useRouter(),
) => {
  return {
    ...useAuthRedirector('authenticated', redirectTo, router),
  }
}

export default useAuthenticatedRedirector
