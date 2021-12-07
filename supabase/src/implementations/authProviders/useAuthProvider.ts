import handlesErrors from '../useHandlesErrors'
import { ref } from 'vue-demi'
import useClient from '../../useClient'
import { useAuthState } from '../../main'

type AuthProvider = 'facebook' | 'github' | 'google' | 'twitter'

export const useAuthProvider = (authProvider: AuthProvider) => {
  const loading = ref(false)
  const auth = useClient().auth
  const authState = useAuthState()

  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors
  } = handlesErrors()

  const signIn = async () => {
    loading.value = true
    let response
    try {
      response = await auth.signIn({ provider: authProvider })
    } catch (error) {
      // TODO: Handle error
      console.log('handle the error', error)
    }

    if (response?.user) {
      authState.user.value = response.user
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
    resetErrors
  }
}

export default useAuthProvider
