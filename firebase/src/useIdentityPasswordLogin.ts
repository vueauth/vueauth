import useHandlesErrors from '../useHandlesErrors'
import { getAuth, signInWithEmailAndPassword, AuthError } from 'firebase/auth'
import { ref, watch } from 'vue-demi'
import { UseIdentityPasswordLogin } from 'auth-composables'

export const useIdentityPasswordLogin: UseIdentityPasswordLogin = () => {
  const loading = ref(false)

  const {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
    resetStandardErrors,
    resetValidationErrors
  } = useHandlesErrors()

  const form = ref({
    email: '',
    password: ''
  })

  watch(form.value, () => {
    resetErrors()
  })

  const login = async () => {
    loading.value = true
    try {
      const auth = getAuth()

      await signInWithEmailAndPassword(
        auth,
        form.value.email,
        form.value.password
      )
    } catch (err) {
      if (typeof err === 'object' && err !== null && err.constructor.name === 'FirebaseError') {
        setErrorsFromResponse(err as AuthError)
      }
    }
    loading.value = false
  }

  return {
    form,
    login,
    loading,
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetErrors,
    resetStandardErrors,
    resetValidationErrors
  }
}

export default useIdentityPasswordLogin
