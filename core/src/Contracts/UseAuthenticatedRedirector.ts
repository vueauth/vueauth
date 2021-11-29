import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRef } from '@vueuse/core'
import { Ref } from 'vue-demi'

export interface UseAuthenticatedRedirectorReturn {
  execOnAuthStateChange: () => void;
  execOnAuthStateEnsured: () => void;
  exec: () => void;
  redirectTo: MaybeRef<RouteLocationRaw>;
  checking: Ref<boolean>;
  onChecked: Ref<((user: unknown) => void) | null>;
}

export type UseAuthenticatedRedirector = (
  redirectTo?: MaybeRef<RouteLocationRaw>,
  router?: Router
) => UseAuthenticatedRedirectorReturn
