import { useAuthRedirector } from './useAuthRedirector'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { UseAuthenticatedRedirector } from '@vueauth/core'

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
