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
    resetErrors,
  } = handlesErrors()

  const signIn = async () => {
    loading.value = true
    const { error, user } = await auth.signIn({ provider: authProvider })
    if (error) {
      errors.value.push({
        type: error.status.toString(),
        message: error.message,
      })
    }

    if (user) {
      authState.user.value = user
    }

    loading.value = false
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

export default useAuthProvider
