import { ref } from 'vue-demi'
import getSanctumConfig from '../getSanctumConfig'
import useHandlesErrors from './useHandlesErrors'
import useAuthState from './useAuthState'
import { UseIdentityPasswordLogin } from 'auth-composables'

export const useIdentityPasswordLogin: UseIdentityPasswordLogin = () => {
  const loading = ref(false)
  const { requester } = getSanctumConfig()
  const { login: loginRequest, getUser } = requester

  const { user } = useAuthState()
  const {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse
  } = useHandlesErrors()

  const form = ref({
    email: '',
    password: ''
  })

  const login = async () => {
    loading.value = true
    const loginResponse = await loginRequest(form.value)
    if (loginResponse.error) {
      setErrorsFromResponse(loginResponse)
      loading.value = false
      return
    }

    const fetchUserResponse = await getUser()
    if (fetchUserResponse.error) {
      setErrorsFromResponse(fetchUserResponse)
      loading.value = false
      return
    }

    user.value = fetchUserResponse.data
    loading.value = false
  }

  return {
    form,
    login,
    loading,

    // Error Handling
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors
  }
}

export default useIdentityPasswordLogin
