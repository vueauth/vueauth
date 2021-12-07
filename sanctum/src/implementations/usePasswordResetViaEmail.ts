import { ref } from 'vue-demi'
import getSanctumConfig from '../getSanctumConfig'
import useHandlesErrors from './useHandlesErrors'
import { UsePasswordResetViaEmail } from 'auth-composables'

export const usePasswordResetViaEmail: UsePasswordResetViaEmail = () => {
  const loading = ref(false)
  const { requester } = getSanctumConfig()
  const { forgotPassword, resetPassword } = requester

  const {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse
  } = useHandlesErrors()

  const requestForm = ref({ email: '' })

  const resetForm = ref({
    email: '',
    password: '',
    password_confirmation: ''
  })

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
    const response = await resetPassword(resetForm.value)
    if (response.error) {
      setErrorsFromResponse(response)
      loading.value = false
      return
    }

    loading.value = false
  }

  return {
    requestForm,
    resetForm,
    requestReset,
    reset,
    loading,

    // Error Handling
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors
  }
}

export default usePasswordResetViaEmail
