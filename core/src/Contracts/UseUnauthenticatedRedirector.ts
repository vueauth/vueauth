import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRef } from '@vueuse/core'
import { Ref } from 'vue-demi'

export interface UseUnauthenticatedRedirectorReturn {
  execOnAuthStateChange: () => void;
  execOnAuthStateEnsured: () => void;
  exec: () => void;
  redirectTo: MaybeRef<RouteLocationRaw>;
  checking: Ref<boolean>;
  onChecked: Ref<((user: unknown) => void) | null>;
}

export type UseUnauthenticatedRedirector = (
  redirectTo?: MaybeRef<RouteLocationRaw>,
  router?: Router
) => UseUnauthenticatedRedirectorReturn
