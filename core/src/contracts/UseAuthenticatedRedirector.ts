import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRefOrGetter, Ref } from 'vue'
import { RedirectTriggers } from './UseAuthRedirector'

export interface UseAuthenticatedRedirectorReturn {
  execOnAuthStateChange: () => void;
  execOnAuthStateEnsured: () => void;
  exec: () => void;
  redirectTo: MaybeRefOrGetter<RouteLocationRaw>;
  checking: Ref<boolean>;
  onChecked: Ref<((user: unknown) => void) | null>;
}

export interface UseAuthenticatedRedirectorConfig {
  redirectOn?: RedirectTriggers
  authProvider?: string
  redirectTo?: MaybeRefOrGetter<RouteLocationRaw>,
  router?: Router
}

export interface UseAuthenticatedRedirector {
  (config?: UseAuthenticatedRedirectorConfig): UseAuthenticatedRedirectorReturn
  baseConfig: UseAuthenticatedRedirectorConfig
}

export interface UseAuthenticatedRedirectorBaseConfig {
  composable: UseAuthenticatedRedirector
  redirectTo?: MaybeRefOrGetter<RouteLocationRaw>,
  router?: Router
}
