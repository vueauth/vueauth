import { Ref, ComputedRef } from 'vue-demi'

export type UseFetchUserReturn = {
  fetch: () => void
  loading: Ref<boolean>
  hasErrors: ComputedRef<boolean>
  errors: Ref<{
      type: string
      message: string
  }[]>;
  resetStandardErrors: () => void
  resetErrors: () => void
}

export interface UseFetchUserConfig {
  authProvider?: string
}

export interface UseFetchUser {
  (config?: UseFetchUserConfig): UseFetchUserReturn
}

export interface UseFetchUserBaseConfig {
  composable: UseFetchUser
}
