import { ValidationErrors } from '../Types/ValidationErrors'
import { RequestErrors } from '../Types/RequestErrors'
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

export type UsePasswordResetViaEmail = () => UsePasswordResetViaEmailReturn
