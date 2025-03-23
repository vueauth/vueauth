import { ref } from 'vue'
import { useHandlesErrors, UsePasswordResetViaEmail } from '@vueauth/core'
import { generateRandomString } from 'src/utils/generateRandomString'
import { state } from 'src/plugin/state'

const usePasswordResetViaEmail: UsePasswordResetViaEmail = () => {
  const loading = ref(false)

  const db = state.db

  const {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
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

    await db?.sleep()

    const resetToken = generateRandomString()
    localStorage.setItem(`passwordResetToken:${requestForm.value.email}`, resetToken)

    loading.value = false
  }

  const reset = async () => {
    resetErrors()
    resetValidationErrors()

    if (resetPasswordForm.value.password.length < 4) {
      validationErrors.value.password = ['password must be more than 3 characters']
    }

    if (resetPasswordForm.value.password_confirmation !== resetPasswordForm.value.password) {
      validationErrors.value.password_confirmation = ['passwords do not match']
    }

    if (hasValidationErrors.value) {
      return
    }

    loading.value = true

    const urlParams = new URLSearchParams(window.location.search)
    const resetToken = urlParams.get('password-reset-token')
    const email = urlParams.get('email')

    const backendPasswordResetToken = localStorage.getItem(`passwordResetToken:${email}`)

    if (backendPasswordResetToken !== resetToken) {
      errors.value.push({ type: 'invalid token', message: 'invalid password reset token' })
    }

    if (!email) {
      errors.value.push({ type: 'missing-email', message: 'missing email for password reset' })
    }

    if (hasErrors.value) {
      return
    }

    try {
      await db?.changePassword({
        email: email as string,
        newPassword: resetPasswordForm.value.password,
      })
    } catch (e: any) {
      if ('message' in e) errors.value.push({ message: e.message, type: 'register' })
      else errors.value.push({ message: 'unknown error while registering', type: 'unknown' })
    } finally {
      loading.value = false
      localStorage.removeItem(`passwordResetToken:${email}`)
    }
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
