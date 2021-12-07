import useHandlesErrors from './useHandlesErrors'
import { ref } from 'vue-demi'
import { UsePasswordResetViaEmail } from 'auth-composables'
import useClient from '../useClient'

export const usePasswordResetViaEmail: UsePasswordResetViaEmail = () => {
  const loading = ref(false)

  const client = useClient()
  const auth = client.auth

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

  const requestForm = ref({ email: '' })

  const resetForm = ref({
    password: '',
    password_confirmation: ''
  })

  const requestReset = async () => {
    loading.value = true
    const { error } = await auth.api.resetPasswordForEmail(requestForm.value.email, {
      redirectTo: window.location.origin + '/password-reset'
    })
    if (error) setErrorsFromResponse(error)

    loading.value = false
  }

  const reset = async () => {
    loading.value = true
    const { error } = await auth.api.updateUser(
      getAccessToken(),
      { password: resetForm.value.password }
    )
    if (error) setErrorsFromResponse(error)
    loading.value = false
  }

  function getAccessToken (): string {
    const session = auth.session()
    if (!session) {
      throw new Error('Missing session data. Ensure the password reset link is correct.')
    }
    return session.access_token
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
