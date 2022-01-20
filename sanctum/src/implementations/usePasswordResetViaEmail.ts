import { ref } from 'vue-demi'
import getSanctumConfig from '../getSanctumConfig'
import useHandlesErrors from './useHandlesErrors'
import { UsePasswordResetViaEmail } from '@vueauth/core'

const usePasswordResetViaEmail: UsePasswordResetViaEmail = () => {
  const loading = ref(false)
  const { makeRequester } = getSanctumConfig()
  const { forgotPassword, resetPassword } = makeRequester()

  const {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
  } = useHandlesErrors()

  const requestForm = ref({ email: '' })
  function resetRequestForm () {
    Object.keys(requestForm.value).forEach(key => { requestForm.value[key] = '' })
  }
  const resetPasswordForm = ref({
    email: '',
    password: '',
    password_confirmation: '',
  })
  function resetResetPasswordForm () {
    Object.keys(resetPasswordForm.value).forEach(key => { resetPasswordForm.value[key] = '' })
  }

  const requestReset = async () => {
    loading.value = true
    const response = await forgotPassword(requestForm.value)
    if (response.error) {
      setErrorsFromResponse(response)
      loading.value = false
      return
    }

    loading.value = false
  }

  const reset = async () => {
    loading.value = true
    const response = await resetPassword(resetPasswordForm.value)
    if (response.error) {
      setErrorsFromResponse(response)
      loading.value = false
      return
    }

    loading.value = false
  }

  return {
    requestForm,
    resetPasswordForm,
    requestReset,
    reset,
    loading,
    resetResetPasswordForm,
    resetRequestForm,

    // Error Handling
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
  }
}

export {
  usePasswordResetViaEmail as default,
  usePasswordResetViaEmail,
}
