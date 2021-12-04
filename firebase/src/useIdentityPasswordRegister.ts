import useHandlesErrors from './useHandlesErrors'
import { getAuth, createUserWithEmailAndPassword, AuthError } from 'firebase/auth'
import { ref, watch } from 'vue-demi'
import { UseIdentityPasswordRegister } from 'auth-composables'

export const useIdentityPasswordRegister: UseIdentityPasswordRegister = () => {
  const loading = ref(false)

  const {
    errors,
    hasErrors,
    fromResponse: setErrorsFromResponse,
    validationErrors,
    hasValidationErrors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors
  } = useHandlesErrors()

  const form = ref({
    email: '',
    password: '',
    password_confirmation: ''
  })

  watch(form.value, () => {
    resetErrors()
  })

  const register = async () => {
    loading.value = true
    let response
    try {
      const auth = getAuth()
      response = await createUserWithEmailAndPassword(
        auth,
        form.value.email,
        form.value.password
      )

      console.log(response)

      resetErrors()
    } catch (err) {
      if (typeof err === 'object' && err !== null && err.constructor.name === 'FirebaseError') {
        setErrorsFromResponse(err as AuthError)
      }
    }
    loading.value = false
  }

  return {
    form,
    register,
    loading,
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors
  }
}
