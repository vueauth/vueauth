import useHandlesErrors from './useHandlesErrors'
import {
  getAuth, sendPasswordResetEmail,
  confirmPasswordReset, AuthError,
} from 'firebase/auth'
import { ref } from 'vue-demi'
import { UsePasswordResetViaEmail } from '@vueauth/core'

const usePasswordResetViaEmail: UsePasswordResetViaEmail = () => {
  const loading = ref(false)

  const auth = getAuth()

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
    try {
      await sendPasswordResetEmail(auth, requestForm.value.email)
    } catch (err) {
      if (typeof err === 'object' && err !== null && err.constructor.name === 'FirebaseError') {
        setErrorsFromResponse(err as AuthError)
      }
    }

    loading.value = false
  }

  const reset = async () => {
    loading.value = true
    try {
      await confirmPasswordReset(
        auth, getOobCode(), resetPasswordForm.value.password,
      )
    } catch (err) {
      if (typeof err === 'object' && err !== null && err.constructor.name === 'FirebaseError') {
        setErrorsFromResponse(err as AuthError)
      }
    }

    loading.value = false
  }

  function getOobCode (): string {
    const urlParams = new URLSearchParams(window.location.search)
    const oobCode = urlParams.get('oobCode')
    if (typeof oobCode !== 'string') {
      throw new Error('Missing oob code. There should be an "oobCode" param in the query string, but it seems to be missing.')
    }
    return oobCode
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
