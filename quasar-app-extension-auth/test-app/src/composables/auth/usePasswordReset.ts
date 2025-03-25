import { usePasswordResetViaEmail } from '@vueauth/core'

export const usePasswordReset = () => {
  const {
    requestForm,
    resetPasswordForm,
    requestReset,
    reset,
    loading,
    hasValidationErrors,
    validationErrors,
    errors,
    resetErrors,
    hasErrors,
  } = usePasswordResetViaEmail()

  async function onResetClicked() {
    await reset()
  }

  return {
    onResetClicked,
    requestForm,
    resetPasswordForm,
    requestReset,
    reset,
    loading,
    hasValidationErrors,
    validationErrors,
    errors,
    hasErrors,
    resetErrors,
  }
}
