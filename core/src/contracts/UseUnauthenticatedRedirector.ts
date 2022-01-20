import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRef } from '@vueuse/core'
import { Ref } from 'vue-demi'
import { RedirectTriggers } from './UseAuthRedirector'

export interface UseUnauthenticatedRedirectorReturn {
  execOnAuthStateChange: () => void;
  execOnAuthStateEnsured: () => void;
  exec: () => void;
  redirectTo: MaybeRef<RouteLocationRaw>;
  checking: Ref<boolean>;
  onChecked: Ref<((user: unknown) => void) | null>;
}

export interface UseUnauthenticatedRedirectorConfig {
  redirectOn?: RedirectTriggers
  authProvider?: string
  redirectTo?: MaybeRef<RouteLocationRaw>
  router?: Router
}

export interface UseUnauthenticatedRedirector {
  (config?: UseUnauthenticatedRedirectorConfig): UseUnauthenticatedRedirectorReturn
  baseConfig?: UseUnauthenticatedRedirectorConfig
}

export interface UseUnauthenticatedRedirectorBaseConfig {
  composable: UseUnauthenticatedRedirector
  redirectTo?: MaybeRef<RouteLocationRaw>
}
