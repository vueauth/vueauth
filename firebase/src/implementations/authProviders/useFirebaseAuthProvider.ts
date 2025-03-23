import { getAuth, signInWithPopup, AuthProvider, AuthError } from 'firebase/auth'
import handlesErrors from '../useHandlesErrors'
import { ref } from 'vue'

export const useFirebaseAuthProvider = (authProvider: AuthProvider) => {
  const loading = ref(false)

  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
  } = handlesErrors()

  const signIn = async () => {
    loading.value = true
    let response
    try {
      response = await signInWithPopup(getAuth(), authProvider)
    } catch (error) {
      if (typeof error === 'object' && error !== null && error.constructor.name === 'FirebaseError') {
        setErrorsFromResponse(error as AuthError)
      }
    }
    loading.value = false
    return response
  }

  return {
    signIn,
    loading,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
  }
}

export default useFirebaseAuthProvider
