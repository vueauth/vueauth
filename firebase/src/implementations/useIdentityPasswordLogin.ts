import useHandlesErrors from './useHandlesErrors'
import { getAuth, signInWithEmailAndPassword, AuthError, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import { ref, watch } from 'vue-demi'
import { UseIdentityPasswordLogin } from '@vueauth/core'

const useIdentityPasswordLogin: UseIdentityPasswordLogin = () => {
  const loading = ref(false)

  const isReauthenticating = ref(false)

  const {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
    resetStandardErrors,
    resetValidationErrors,
  } = useHandlesErrors()

  const form = ref({
    email: '',
    password: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  watch(form.value, () => {
    resetErrors()
  })

  const login = async () => {
    loading.value = true
    try {
      const auth = getAuth()
      const user = auth.currentUser

      if (user && isReauthenticating.value) {
        const { email, password } = form.value
        const credentials = EmailAuthProvider.credential(email, password)
        await reauthenticateWithCredential(auth.currentUser, credentials)
      } else {
        await signInWithEmailAndPassword(
          auth,
          form.value.email,
          form.value.password,
        )
      }
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
    resetValidationErrors,
    isReauthenticating,
    resetForm,
  }
}

export {
  useIdentityPasswordLogin as default,
  useIdentityPasswordLogin,
}
