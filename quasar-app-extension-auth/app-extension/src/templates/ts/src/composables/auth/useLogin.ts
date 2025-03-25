import { useRouter } from 'vue-router'
import { useIdentityPasswordLogin, useAuthState } from '@vueauth/core'

export const useLogin = () => {
  const router = useRouter()
  const {
    form,
    loading,
    errors,
    hasErrors,
    validationErrors,
    hasValidationErrors,
    login,
    isReauthenticating,
    resetForm,
    resetErrors,
  } = useIdentityPasswordLogin()
  const { user } = useAuthState()

  async function handleLogin() {
    resetErrors()
    await login()
    if (!hasErrors.value) {
      await router.push({ name: 'dashboard' })
    }
  }

  async function onForgotPasswordClicked() {
    await router.push({ name: 'auth.requestPasswordReset' })
  }

  /**
   * For some auth providers reauthentication requires an email address.
   * This function prefills the email if possible,
   * saving the user from typing it in
   */
  function attemptSetEmailOnForm() {
    if (typeof form.value.email === 'string' && user.value?.email) {
      form.value.email = user.value.email
    }
  }

  return {
    handleLogin,
    onForgotPasswordClicked,
    form,
    loading,
    errors,
    hasErrors,
    validationErrors,
    hasValidationErrors,
    login,
    resetForm,
    isReauthenticating,
    attemptSetEmailOnForm,
  }
}
