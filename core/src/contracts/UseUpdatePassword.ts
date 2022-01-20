import { ValidationErrors } from '../types/ValidationErrors'
import { RequestErrors } from '../types/RequestErrors'
import { Ref, ComputedRef } from 'vue-demi'

export interface UpdatePasswordform {
    current_password?: string
    password: string
    password_confirmation: string
    [key: string | number]: unknown
}

export interface UseUpdatePasswordReturn {
  form: Ref<UpdatePasswordform>
  update: () => Promise<void>
  requiresReauthentication?: Ref<boolean>
  loading: Ref<boolean>
  validationErrors: Ref<ValidationErrors>;
  hasValidationErrors: ComputedRef<boolean>
  hasErrors: ComputedRef<boolean>
  errors: Ref<RequestErrors>;
  resetStandardErrors: () => void
  resetValidationErrors: () => void
  resetErrors: () => void
  resetForm: () => void
}

export interface UseUpdatePasswordConfig {
  authProvider?: string
}

export interface UseUpdatePassword {
  (config?: UseUpdatePasswordConfig): UseUpdatePasswordReturn
}

export interface UseUpdatePasswordBaseConfig {
  composable: UseUpdatePassword
}
