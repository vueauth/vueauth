import { ValidationErrors } from '../Types/ValidationErrors'
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

export type UseHandlesErrors = () => UseHandlesErrorsReturn
