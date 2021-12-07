import { ValidationErrors } from '../Types/ValidationErrors'
import { RequestErrors } from '../Types/RequestErrors'
import { Ref, ComputedRef } from 'vue-demi'

export interface UpdatePasswordform {
    current_password: string
    password: string
    [key: string | number]: unknown
}

export interface UseUpdatePasswordReturn {
  form: Ref<UpdatePasswordform>;
  update: () => Promise<void>
  loading: Ref<boolean>
  validationErrors: Ref<ValidationErrors>;
  hasValidationErrors: ComputedRef<boolean>
  hasErrors: ComputedRef<boolean>
  errors: Ref<RequestErrors>;
  resetStandardErrors: () => void
  resetValidationErrors: () => void
  resetErrors: () => void
}

export type UseUpdatePassword = () => UseUpdatePasswordReturn
