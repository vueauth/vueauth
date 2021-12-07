import { ValidationErrors } from '../Types/ValidationErrors'
import { RequestErrors } from '../Types/RequestErrors'
import { Ref, ComputedRef } from 'vue-demi'

export interface IdentityPasswordRegisterFlags {
  emailConfirm: boolean
}

export interface IdentityPasswordRegisterForm {
    email: string
    password: string
    password_confirmation: string
    [key: string | number]: unknown
}

export interface UseIdentityPasswordRegisterReturn {
  form: Ref<IdentityPasswordRegisterForm>;
  customFields: Ref<Record<number | string, unknown>>;
  register: () => Promise<void>;
  loading: Ref<boolean>;
  validationErrors: Ref<ValidationErrors>;
  hasValidationErrors: ComputedRef<boolean>;
  hasErrors: ComputedRef<boolean>;
  errors: Ref<RequestErrors>;
  resetStandardErrors: () => void;
  resetValidationErrors: () => void;
  resetErrors: () => void;
  flags: IdentityPasswordRegisterFlags;
}

export type UseIdentityPasswordRegister = () => UseIdentityPasswordRegisterReturn
