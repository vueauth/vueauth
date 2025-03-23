import { ref } from 'vue'
import useAuthState from './useAuthState'
import { useHandlesErrors, UseIdentityPasswordLogin } from '@vueauth/core'
import { state } from 'src/plugin/state'
import { validateEmail } from 'src/utils/validateEmail'

const useIdentityPasswordLogin: UseIdentityPasswordLogin = () => {
  const loading = ref(false)

  const db = state.db

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
    email: '',
    password: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  const login = async () => {
    resetStandardErrors()
    resetValidationErrors()

    if (!validateEmail(form.value.email)) {
      validationErrors.value.email = ['Please enter a valid email']
    }

    loading.value = true

    try {
      const result = await db?.login(form.value)
      if (!result) {
        errors.value.push({ message: 'Email password combination is incorrect', type: 'email-password' })
        return
      }

      const authenticatedUser = await db?.getAuthenticatedUser()
      if (!authenticatedUser) {
        errors.value.push({ message: 'could not fetch authenticated user', type: 'fetching-user' })
      } else {
        user.value = authenticatedUser
      }
    } catch (e: any) {
      if ('message' in e) errors.value.push({ message: e.message, type: 'login' })
      else errors.value.push({ message: 'unknown error while logging in', type: 'unknown' })
    } finally {
      loading.value = false
    }
  }

  return {
    form,
    login,
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
  useIdentityPasswordLogin as default,
  useIdentityPasswordLogin,
}
