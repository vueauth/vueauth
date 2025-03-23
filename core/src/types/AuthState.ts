import { Ref, ComputedRef } from 'vue'
import { User } from './User'

export interface AuthState {
  authIsReady: Ref<boolean>
  isAuthenticated: ComputedRef<boolean>
  user: Ref<User | null>
}
