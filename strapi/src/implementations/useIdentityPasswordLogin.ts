import { ref } from 'vue-demi'
import getStrapiConfig from '../getStrapiConfig'
import useHandlesErrors from './useHandlesErrors'
import useAuthState from './useAuthState'
import { UseIdentityPasswordLogin } from '@vueauth/core'
import { getTokenRepo } from 'src/helpers/getTokenRepo'

const useIdentityPasswordLogin: UseIdentityPasswordLogin = () => {
  const loading = ref(false)

  const { makeRequester } = getStrapiConfig()
  const { login: loginRequest, getUser } = makeRequester()

  const tokenRepo = getTokenRepo()

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
    const loginResponse = await loginRequest({
      identifier: form.value.email,
      password: form.value.password,
    })
    if (loginResponse.error) {
      setErrorsFromResponse(loginResponse)
      loading.value = false
      return
    }

    await tokenRepo.set(loginResponse.asJson().jwt)

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
