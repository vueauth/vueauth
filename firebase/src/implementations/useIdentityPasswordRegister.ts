import useHandlesErrors from './useHandlesErrors'
import { getAuth, createUserWithEmailAndPassword, AuthError } from 'firebase/auth'
import { ref, watch } from 'vue'
import { UseIdentityPasswordRegister } from '@vueauth/core'

const useIdentityPasswordRegister: UseIdentityPasswordRegister = () => {
  const loading = ref(false)

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
    email: '',
    password: '',
    password_confirmation: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  watch(form.value, () => {
    resetErrors()
  })

  const register = async () => {
    loading.value = true
    if (form.value.password !== form.value.password_confirmation) {
      validationErrors.value = {
        password: ['The password confirmation does not match.'],
      }
      loading.value = false
      return
    }

    try {
      const auth = getAuth()
      await createUserWithEmailAndPassword(
        auth,
        form.value.email,
        form.value.password,
      )

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
    resetErrors,
    resetForm,
  }
}

useIdentityPasswordRegister.baseConfig = {
  emailConfirm: false,
}

export {
  useIdentityPasswordRegister as default,
  useIdentityPasswordRegister,
}
