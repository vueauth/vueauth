import { ValidationErrors } from '../types/ValidationErrors'
import { RequestErrors } from '../types/RequestErrors'
import { Ref, ComputedRef } from 'vue-demi'

export interface PasswordResetRequestform {
    email: string
    [key: string | number]: unknown
}

export interface PasswordResetform {
    password: string
    [key: string | number]: unknown
}

export interface UsePasswordResetViaEmailReturn {
  requestForm: Ref<PasswordResetRequestform>
  resetPasswordForm: Ref<PasswordResetform>
  requestReset: () => Promise<void>
  reset: () => Promise<void>
  loading: Ref<boolean>
  validationErrors: Ref<ValidationErrors>
  hasValidationErrors: ComputedRef<boolean>
  hasErrors: ComputedRef<boolean>
  errors: Ref<RequestErrors>
  resetStandardErrors: () => void
  resetValidationErrors: () => void
  resetErrors: () => void
  resetResetPasswordForm: () => void
  resetRequestForm: () => void
}

export interface UsePasswordResetViaEmailConfig {
  authProvider?: string
}

export interface UsePasswordResetViaEmail {
  (config?: UsePasswordResetViaEmailConfig): UsePasswordResetViaEmailReturn
}

export interface UsePasswordResetViaEmailBaseConfig {
  composable: UsePasswordResetViaEmail
}
