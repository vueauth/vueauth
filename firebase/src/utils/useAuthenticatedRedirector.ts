import { useAuthRedirector } from "./useAuthRedirector"
import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRef } from '@vueuse/core'
import { useRouter } from "vue-router"
import { ref } from 'vue-demi'

export const useAuthenticatedRedirector = (
  redirectTo: MaybeRef<RouteLocationRaw> = ref('/'),
  router: Router = useRouter()
) => {
  return {
    ...useAuthRedirector('authenticated', redirectTo, router)
  }
}

export default useAuthenticatedRedirector