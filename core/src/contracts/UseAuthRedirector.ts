import { RouteLocationRaw, Router } from 'vue-router'
import { MaybeRefOrGetter } from 'vue'
import { Ref } from 'vue'

export type UserOnCheckedFunction = (user: unknown | null) => void
export type RedirectTriggers = 'authenticated' | 'unauthenticated' | 'error'

export const redirectTriggers: RedirectTriggers[] = [
  'authenticated',
  'unauthenticated',
  'error',
]

export interface UseAuthRedirectorReturn {
  execOnAuthStateChange: () => void
  execOnAuthStateEnsured: () => void
  exec: () => void
  redirectTo: MaybeRefOrGetter<RouteLocationRaw>
  checking: Ref<boolean>
  onChecked: Ref<UserOnCheckedFunction | null>
}

export interface UseAuthRedirectorConfig {
  redirectOn?: RedirectTriggers
  authProvider?: string
  redirectTo?: MaybeRefOrGetter<RouteLocationRaw>
  router?: Router
}

export interface UseAuthRedirector {
  (config: UseAuthRedirectorConfig): UseAuthRedirectorReturn
  baseConfig: UseAuthRedirectorConfig
}

export interface UseAuthRedirectorBaseConfig {
  composable: UseAuthRedirector
  redirectTo?: MaybeRefOrGetter<RouteLocationRaw>
}
