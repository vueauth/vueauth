import { ref } from 'vue'
import getSanctumConfig from '../getSanctumConfig'
import useHandlesErrors from './useHandlesErrors'
import useAuthState from './useAuthState'
import { UseIdentityPasswordLogin } from '@vueauth/core'

const useIdentityPasswordLogin: UseIdentityPasswordLogin = () => {
  const loading = ref(false)
  const { makeRequester } = getSanctumConfig()
  const { login: loginRequest, getUser } = makeRequester()

  const { user } = useAuthState()
  const {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
  } = useHandlesErrors()

  const form = ref({
    email: '',
    password: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

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
    resetForm,

    // Error Handling
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
  }
}

export {
  useIdentityPasswordLogin as default,
  useIdentityPasswordLogin,
}
