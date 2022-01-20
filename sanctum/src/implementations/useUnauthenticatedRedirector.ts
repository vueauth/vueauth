import useAuthRedirector from './useAuthRedirector'
import { useRouter } from 'vue-router'
import { UseUnauthenticatedRedirector } from '@vueauth/core'
import { ref } from 'vue-demi'

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
