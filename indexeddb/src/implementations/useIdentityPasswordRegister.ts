import { ref } from 'vue'
import useAuthState from './useAuthState'
import { useHandlesErrors, UseIdentityPasswordRegister, UseIdentityPasswordRegisterConfig } from '@vueauth/core'
import { state } from '../plugin/state'
import { validateEmail } from 'src/utils/validateEmail'

const baseConfig: UseIdentityPasswordRegisterConfig = {
  emailConfirm: false,
}

const useIdentityPasswordRegister: UseIdentityPasswordRegister = () => {
  const db = state.db

  const loading = ref(false)

  const { user } = useAuthState()
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
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })

  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  const register = async () => {
    resetStandardErrors()
    resetValidationErrors()

    if (!validateEmail(form.value.email)) {
      validationErrors.value.email = ['Please enter a valid email']
    }

    if (form.value.password.length < 4) {
      validationErrors.value.password = ['password must be more than 3 characters']
    }

    if (form.value.password_confirmation !== form.value.password) {
      validationErrors.value.password_confirmation = ['passwords do not match']
    }

    if (!form.value.name || typeof form.value.name !== 'string') {
      validationErrors.value.name = ['name is required']
    }

    if (hasValidationErrors.value) {
      loading.value = false
      return
    }

    loading.value = true

    try {
      await db?.register({
        ...form.value,
        id: state.makeUserId(),
      })

      const authenticatedUser = await db?.getAuthenticatedUser()
      if (authenticatedUser) {
        user.value = authenticatedUser
      }
    } catch (e: any) {
      if ('message' in e) errors.value.push({ message: e.message, type: 'register' })
      else errors.value.push({ message: 'unknown error while registering', type: 'unknown' })
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    register,
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

useIdentityPasswordRegister.baseConfig = baseConfig

export {
  useIdentityPasswordRegister as default,
  useIdentityPasswordRegister,
}
