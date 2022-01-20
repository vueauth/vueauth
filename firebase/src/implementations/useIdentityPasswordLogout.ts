import useHandlesErrors from './useHandlesErrors'
import { getAuth, signOut as firebaseSignOut, AuthError } from 'firebase/auth'
import { ref } from 'vue-demi'
import { UseIdentityPasswordLogout } from '@vueauth/core'

const useIdentityPasswordLogout: UseIdentityPasswordLogout = () => {
  const loading = ref(false)

  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
  } = useHandlesErrors()

  const logout = async () => {
    loading.value = true
    try {
      const auth = getAuth()
      await firebaseSignOut(auth)
    } catch (err) {
      if (typeof err === 'object' && err !== null && err.constructor.name === 'FirebaseError') {
        setErrorsFromResponse(err as AuthError)
      }
    }
    loading.value = false
  }

  return {
    logout,
    loading,
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  }
}

export {
  useIdentityPasswordLogout as default,
  useIdentityPasswordLogout,
}
