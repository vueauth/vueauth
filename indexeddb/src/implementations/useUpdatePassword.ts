import { ref } from 'vue'
import { useHandlesErrors, UseUpdatePassword } from '@vueauth/core'
import { state } from 'src/plugin/state'

const useUpdatePassword: UseUpdatePassword = () => {
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

  const form = ref({
    current_password: '',
    password: '',
    password_confirmation: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  const update = async () => {
    resetErrors()
    resetValidationErrors()

    const authenticatedUserEmail = localStorage.getItem('authenticatedUserEmail')
    if (!authenticatedUserEmail) {
      errors.value.push({
        message: 'could not discover authenticated user',
        type: 'auth-user',
      })
      return
    }

    if (form.value.password !== form.value.password_confirmation) {
      validationErrors.value.password = ['password and password confirmation must match']
      return
    }
    if (typeof form.value.password === 'string' && form.value.password.length < 6) {
      validationErrors.value.password = ['password must be at least 6 characters long']
      return
    }

    try {
      await db?.changePassword({
        email: authenticatedUserEmail,
        oldPassword: form.value.current_password,
        newPassword: form.value.password,
      })
    } catch (e: any) {
      if ('message' in e) errors.value.push({ message: e.message, type: 'register' })
      else errors.value.push({ message: 'unknown error while registering', type: 'unknown' })
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    update,
    loading,
    resetForm,

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
  useUpdatePassword as default,
  useUpdatePassword,
}
