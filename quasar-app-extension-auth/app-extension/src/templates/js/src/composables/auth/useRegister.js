import { useIdentityPasswordRegister, getConfig } from '@vueauth/core'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

export const useRegister = () => {
  const router = useRouter()
  const config = getConfig<UseIdentityPasswordRegisterConfig>('identityPassword:register')
  let emailConfirm = false
  if ('emailConfirm' in config) {
    emailConfirm = !!config.emailConfirm
  }
  const registered = ref()

  const {
    form,
    loading,
    errors,
    hasErrors,
    validationErrors,
    hasValidationErrors,
    register,
  } = useIdentityPasswordRegister()

  async function handleRegister() {
    await register()
    if (!hasErrors.value) {
      registered.value = true
      if (!emailConfirm) {
        await router.push({ name: 'dashboard' })
      }
    }
  }

  return {
    handleRegister,
    form,
    loading,
    errors,
    hasErrors,
    validationErrors,
    hasValidationErrors,
    register,
    router,
    emailConfirm,
    registered,
  }
}
