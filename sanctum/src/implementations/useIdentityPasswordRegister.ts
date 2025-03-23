import getSanctumConfig from '../getSanctumConfig'
import { ref } from 'vue'
import useAuthState from './useAuthState'
import useHandlesErrors from './useHandlesErrors'
import { UseIdentityPasswordRegister, UseIdentityPasswordRegisterConfig } from '@vueauth/core'

const baseConfig: UseIdentityPasswordRegisterConfig = {
  emailConfirm: false,
}

const useIdentityPasswordRegister: UseIdentityPasswordRegister = () => {
  const loading = ref(false)
  const { makeRequester } = getSanctumConfig()
  const { register: registerRequest, getUser } = makeRequester()

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
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  const register = async () => {
    loading.value = true
    const registerResponse = await registerRequest(form.value)
    if (registerResponse.error) {
      setErrorsFromResponse(registerResponse)
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
    register,
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

useIdentityPasswordRegister.baseConfig = baseConfig

export {
  useIdentityPasswordRegister as default,
  useIdentityPasswordRegister,
}
