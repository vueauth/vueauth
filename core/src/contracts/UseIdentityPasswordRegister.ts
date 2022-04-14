import { ValidationErrors } from '../types/ValidationErrors'
import { RequestErrors } from '../types/RequestErrors'
import { Ref, ComputedRef } from 'vue-demi'

export interface IdentityPasswordRegisterForm {
    email: string
    password: string
    password_confirmation: string
    [key: string | number]: unknown
}

export interface UseIdentityPasswordRegisterReturn {
  form: Ref<IdentityPasswordRegisterForm>
  register: () => Promise<void>
  loading: Ref<boolean>
  validationErrors: Ref<ValidationErrors>
  hasValidationErrors: ComputedRef<boolean>
  hasErrors: ComputedRef<boolean>
  errors: Ref<RequestErrors>
  resetStandardErrors: () => void
  resetValidationErrors: () => void
  resetErrors: () => void
  resetForm: () => void
}

export interface UseIdentityPasswordRegisterConfig {
  authProvider?: string
  emailConfirm?: boolean
  withUsername?: boolean
  withName?: boolean
}

export interface UseIdentityPasswordRegister {
  (config?: UseIdentityPasswordRegisterConfig): UseIdentityPasswordRegisterReturn
  baseConfig: UseIdentityPasswordRegisterConfig
}

export interface UseIdentityPasswordRegisterBaseConfig {
  composable: UseIdentityPasswordRegister
  emailConfirm?: boolean
}
