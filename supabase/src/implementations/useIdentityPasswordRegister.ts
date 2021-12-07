import useHandlesErrors from './useHandlesErrors'
import { ref, watch } from 'vue-demi'
import { IdentityPasswordRegisterFlags, UseIdentityPasswordRegister } from 'auth-composables'
import useClient from '../useClient'

const flags: IdentityPasswordRegisterFlags = {
  emailConfirm: false
}

export const useIdentityPasswordRegister: UseIdentityPasswordRegister = () => {
  const supabaseClient = useClient()

  const loading = ref(false)

  const {
    errors,
    hasErrors,
    fromResponse: setErrorsFromResponse,
    validationErrors,
    hasValidationErrors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors
  } = useHandlesErrors()

  const form = ref({
    email: '',
    password: '',
    password_confirmation: ''
  })
  const customFields = ref({})

  watch(form.value, () => {
    resetErrors()
  })

  const register = async () => {
    loading.value = true
    if (form.value.password !== form.value.password_confirmation) {
      errors.value.push({
        type: 'validation',
        message: 'The password confirmation does not match.'
      })
      loading.value = false
      return
    }

    const { error } = await supabaseClient.auth.signUp(form.value)
    if (error) setErrorsFromResponse(error)
    loading.value = false
  }

  return {
    form,
    customFields,
    register,
    loading,
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
    flags
  }
}
