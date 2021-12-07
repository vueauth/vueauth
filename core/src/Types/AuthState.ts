import { Ref, ComputedRef } from 'vue-demi'
import { User } from './User'

export interface AuthState {
  authIsReady: Ref<boolean>
  isAuthenticated: ComputedRef<boolean>
  user: Ref<User | null>
}
