import useHandlesErrors from './useHandlesErrors'
import { getAuth, updatePassword, AuthError } from 'firebase/auth'
import { ref } from 'vue-demi'
import { UseUpdatePassword } from 'auth-composables'

export const useUpdatePassword: UseUpdatePassword = () => {
  const loading = ref(false)

  const auth = getAuth()

  const requiresReauthentication = ref(false)

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

  const form = ref({
    password: '',
    password_confirmation: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  const update = async () => {
    if (!auth.currentUser) {
      errors.value.push({ type: '', message: 'unable to get current user' })
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
    loading.value = true
    try {
      await updatePassword(auth.currentUser, form.value.password)
    } catch (err) {
      if (typeof err !== 'object') {
        errors.value.push({ type: '', message: 'unknown error' })
        return
      }
      if (err?.constructor?.name === 'FirebaseError') {
        const firebaseError = err as AuthError
        if (firebaseError.code as string === 'auth/requires-recent-login') {
          requiresReauthentication.value = true
        }
        setErrorsFromResponse(err)
      }
    }

    loading.value = false
  }

  return {
    form,
    update,
    loading,
    resetForm,

    // error Handling
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
    requiresReauthentication,
  }
}
