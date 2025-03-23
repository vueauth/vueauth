import useHandlesErrors from './useHandlesErrors'
import { ref } from 'vue'
import { UsePasswordResetViaEmail } from '@vueauth/core'
import useClient from '../useClient'

const usePasswordResetViaEmail: UsePasswordResetViaEmail = () => {
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
    resetErrors,
  } = useHandlesErrors()

  const requestForm = ref({ email: '' })
  function resetRequestForm () {
    Object.keys(requestForm.value).forEach(key => { requestForm.value[key] = '' })
  }
  const resetPasswordForm = ref({
    password: '',
    password_confirmation: '',
  })
  function resetResetPasswordForm () {
    Object.keys(resetPasswordForm.value).forEach(key => { resetPasswordForm.value[key] = '' })
  }

  const requestReset = async () => {
    loading.value = true
    const { error } = await auth.api.resetPasswordForEmail(requestForm.value.email, {
      redirectTo: window.location.origin + '/password-reset',
    })
    if (error) setErrorsFromResponse(error)

    loading.value = false
  }

  const reset = async () => {
    loading.value = true
    const { error } = await auth.api.updateUser(
      getAccessToken(),
      { password: resetPasswordForm.value.password },
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
    resetRequestForm,
    resetResetPasswordForm,
    requestReset,
    reset,
    loading,
    resetPasswordForm,

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
