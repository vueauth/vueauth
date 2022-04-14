import useAuthRedirector from './useAuthRedirector'
import { useRouter } from 'vue-router'
import { UseAuthenticatedRedirector } from '@vueauth/core'
import { ref } from 'vue-demi'

const useAuthenticatedRedirector: UseAuthenticatedRedirector = (
  config = {
    redirectTo: ref('/'),
    router: useRouter(),
  },
) => {
  config.redirectOn = 'authenticated'
  return {
    ...useAuthRedirector(config),
  }
}

useAuthenticatedRedirector.baseConfig = {}

export {
  useAuthenticatedRedirector as default,
  useAuthenticatedRedirector,
}
