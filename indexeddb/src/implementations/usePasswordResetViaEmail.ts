import { ref } from 'vue'
import { useHandlesErrors, UsePasswordResetViaEmail } from '@vueauth/core'
import { generateRandomString } from 'src/utils/generateRandomString'
import { state } from 'src/plugin/state'
import { useRoute } from 'vue-router'
import { setLocalStorage } from 'src/utils/watchLocalStorage'

const usePasswordResetViaEmail: UsePasswordResetViaEmail = () => {
  const loading = ref(false)

  const route = useRoute()

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

  const routeQueryEmail: string = typeof route.query.email === 'string'
    ? route.query.email
    : ''

  const resetPasswordForm = ref({
    email: routeQueryEmail,
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
    setLocalStorage(`passwordResetToken:${requestForm.value.email}`, resetToken)

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
      loading.value = false
      return
    }

    loading.value = true

    const resetToken = route.query['password-reset-token']

    const backendPasswordResetToken = localStorage.getItem(`passwordResetToken:${resetPasswordForm.value.email}`)

    if (backendPasswordResetToken !== resetToken) {
      errors.value.push({ type: 'invalid token', message: 'invalid password reset token' })
    }

    if (!resetPasswordForm.value.email) {
      errors.value.push({ type: 'missing-email', message: 'missing email for password reset' })
    }

    if (hasErrors.value) {
      loading.value = false
      return
    }

    try {
      await db?.changePassword({
        email: resetPasswordForm.value.email,
        newPassword: resetPasswordForm.value.password,
      })
    } catch (e: any) {
      if ('message' in e) errors.value.push({ message: e.message, type: 'register' })
      else errors.value.push({ message: 'unknown error while registering', type: 'unknown' })
    } finally {
      loading.value = false
      localStorage.removeItem(`passwordResetToken:${resetPasswordForm.value.email}`)
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
