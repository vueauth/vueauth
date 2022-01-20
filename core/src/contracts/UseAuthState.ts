import { AuthState } from '../types/AuthState'

export interface UseAuthStateConfig {
  authProvider?: string
}

export interface UseAuthState {
  (config?: UseAuthStateConfig): AuthState
}

export interface UseAuthStateBaseConfig {
  composable: UseAuthState
}
