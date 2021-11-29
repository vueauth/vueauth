import { Ref, ComputedRef } from 'vue-demi'

export interface AuthState {
  authIsReady: Ref<boolean>
  isAuthenticated: ComputedRef<boolean>
  user: Ref<Record<string | number, unknown> | null>
}
