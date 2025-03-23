import getStrapiConfig from '../getStrapiConfig'
import { ref } from 'vue'
import useAuthState from './useAuthState'
import useHandlesErrors from './useHandlesErrors'
import { UseIdentityPasswordRegister, UseIdentityPasswordRegisterConfig, getConfig } from '@vueauth/core'
import { getTokenRepo } from '../helpers/getTokenRepo'

const baseConfig: UseIdentityPasswordRegisterConfig = {
  emailConfirm: false,
  withUsername: true,
  withName: false,
}

const useIdentityPasswordRegister: UseIdentityPasswordRegister = (context) => {
  const loading = ref(false)

  const { withUsername } = getConfig<{ withUsername: boolean }>('identityPassword:register', context?.authProvider)
  const { makeRequester } = getStrapiConfig()
  const { register: registerRequest } = makeRequester()

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
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  const register = async () => {
    // Strapi requires a username. Set it to the
    // email if dev doesn't want to use one.
    if (!withUsername) {
      form.value.username = form.value.email
    }

    if (form.value.password !== form.value.password_confirmation) {
      validationErrors.value.password_confirmation = [
        'passwords must match',
      ]
      return
    }

    loading.value = true
    const registerResponse = await registerRequest(form.value)
    if (registerResponse.error) {
      setErrorsFromResponse(registerResponse)
      loading.value = false
      return
    }
    resetForm()

    const responseData = registerResponse.asJson()

    user.value = responseData.user
    tokenRepo.set(responseData.jwt)
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
