import useAuthRedirector from './useAuthRedirector'
import { useRouter } from 'vue-router'
import { ref } from 'vue-demi'
import { UseUnauthenticatedRedirector } from '@vueauth/core'

const useUnauthenticatedRedirector: UseUnauthenticatedRedirector = (
  config = {
    redirectTo: ref('/'),
    router: useRouter(),
  },
) => {
  config.redirectOn = 'unauthenticated'
  return {
    ...useAuthRedirector(config),
  }
}

export {
  useUnauthenticatedRedirector as default,
  useUnauthenticatedRedirector,
}
