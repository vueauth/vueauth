import { ValidationErrors } from '../types/ValidationErrors'
import { ComputedRef, Ref } from 'vue-demi'

export interface UseHandlesErrorsReturn {
  validationErrors: Ref<ValidationErrors>
  hasValidationErrors: ComputedRef<boolean>
  hasErrors: ComputedRef<boolean>
  errors: Ref<{
      type: string
      message: string
  }[]>;
  resetStandardErrors: () => void
  resetValidationErrors: () => void
  resetErrors: () => void
  fromResponse: (...args: any[]) => void
}

export interface UseHandlesErrorsConfig {
  authProvider?: string
}

export interface UseHandlesErrors {
  (config?: UseHandlesErrorsConfig): UseHandlesErrorsReturn
}

export interface UseHandlesErrorsBaseConfig {
  composable: UseHandlesErrors
}
