import { ref } from 'vue-demi'
import getSanctumConfig from '../getSanctumConfig'
import useHandlesErrors from './useHandlesErrors'
import useAuthState from './useAuthState'
import { UseIdentityPasswordLogout } from 'auth-composables'

export const useIdentityPasswordLogout: UseIdentityPasswordLogout = () => {
  const loading = ref(false)
  const { requester } = getSanctumConfig()
  const { logout: logoutRequest } = requester

  const { user } = useAuthState()
  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse
  } = useHandlesErrors()

  const logout = async () => {
    loading.value = true
    const response = await logoutRequest()
    if (response.error) {
      setErrorsFromResponse(response)
      loading.value = false
      return
    }

    user.value = null
    loading.value = false
  }

  return {
    logout,
    loading,

    // Error Handling
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors
  }
}

export default useIdentityPasswordLogout
