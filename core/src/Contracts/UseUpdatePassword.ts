import { ValidationErrors } from '../Types/ValidationErrors'
import { RequestErrors } from '../Types/RequestErrors'
import { Ref, ComputedRef } from 'vue-demi'

export interface UpdatePasswordform {
    current_password?: string
    password: string
    password_confirmation: string
    [key: string | number]: unknown
}

export interface UseUpdatePasswordReturn {
  form: Ref<UpdatePasswordform>
  customFields?: Ref<Record<number | string, unknown>>
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

export type UseUpdatePassword = () => UseUpdatePasswordReturn
