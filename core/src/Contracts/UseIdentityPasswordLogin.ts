import { ValidationErrors } from '../Types/ValidationErrors'
import { RequestErrors } from '../Types/RequestErrors'
import { Ref, ComputedRef } from 'vue-demi'

export interface IdentityPasswordLoginForm {
    email: string
    password: string
    [key: string | number]: unknown
}

export interface UseIdentityPasswordLoginReturn {
  form: Ref<IdentityPasswordLoginForm>;
  login: () => Promise<void>
  loading: Ref<boolean>
  validationErrors: Ref<ValidationErrors>;
  hasValidationErrors: ComputedRef<boolean>
  hasErrors: ComputedRef<boolean>
  errors: Ref<RequestErrors>;
  resetStandardErrors: () => void
  resetValidationErrors: () => void
  resetErrors: () => void
  isReauthenticating?: Ref<boolean>
  resetForm: () => void
}

export type UseIdentityPasswordLogin = () => UseIdentityPasswordLoginReturn
