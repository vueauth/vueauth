import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRefOrGetter } from 'vue'
import { Ref } from 'vue'
import { RedirectTriggers } from './UseAuthRedirector'

export interface UseUnauthenticatedRedirectorReturn {
  execOnAuthStateChange: () => void;
  execOnAuthStateEnsured: () => void;
  exec: () => void;
  redirectTo: MaybeRefOrGetter<RouteLocationRaw>;
  checking: Ref<boolean>;
  onChecked: Ref<((user: unknown) => void) | null>;
}

export interface UseUnauthenticatedRedirectorConfig {
  redirectOn?: RedirectTriggers
  authProvider?: string
  redirectTo?: MaybeRefOrGetter<RouteLocationRaw>
  router?: Router
}

export interface UseUnauthenticatedRedirector {
  (config?: UseUnauthenticatedRedirectorConfig): UseUnauthenticatedRedirectorReturn
  baseConfig?: UseUnauthenticatedRedirectorConfig
}

export interface UseUnauthenticatedRedirectorBaseConfig {
  composable: UseUnauthenticatedRedirector
  redirectTo?: MaybeRefOrGetter<RouteLocationRaw>
}
