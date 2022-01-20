import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRef } from '@vueuse/core'
import { Ref } from 'vue-demi'
import { RedirectTriggers } from './UseAuthRedirector'

export interface UseAuthenticatedRedirectorReturn {
  execOnAuthStateChange: () => void;
  execOnAuthStateEnsured: () => void;
  exec: () => void;
  redirectTo: MaybeRef<RouteLocationRaw>;
  checking: Ref<boolean>;
  onChecked: Ref<((user: unknown) => void) | null>;
}

export interface UseAuthenticatedRedirectorConfig {
  redirectOn?: RedirectTriggers
  authProvider?: string
  redirectTo?: MaybeRef<RouteLocationRaw>,
  router?: Router
}

export interface UseAuthenticatedRedirector {
  (config?: UseAuthenticatedRedirectorConfig): UseAuthenticatedRedirectorReturn
  baseConfig: UseAuthenticatedRedirectorConfig
}

export interface UseAuthenticatedRedirectorBaseConfig {
  composable: UseAuthenticatedRedirector
  redirectTo?: MaybeRef<RouteLocationRaw>,
  router?: Router
}
