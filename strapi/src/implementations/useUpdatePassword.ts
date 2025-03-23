import { ref } from 'vue'
import getStrapiConfig from '../getStrapiConfig'
import useHandlesErrors from './useHandlesErrors'
import { UseUpdatePassword } from '@vueauth/core'
import { getTokenRepo } from '../helpers/getTokenRepo'

const useUpdatePassword: UseUpdatePassword = () => {
  const loading = ref(false)
  const { makeRequester } = getStrapiConfig()
  const { updatePassword } = makeRequester()
  const tokenRepo = getTokenRepo()

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
    current_password: '',
    password: '',
    password_confirmation: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  const update = async () => {
    if (form.value.password !== form.value.password_confirmation) {
      validationErrors.value.password = ['password and password confirmation must match']
      return
    }
    if (typeof form.value.password === 'string' && form.value.password.length < 6) {
      validationErrors.value.password = ['password must be at least 6 characters long']
      return
    }
    loading.value = true
    const response = await updatePassword({
      password: form.value.current_password,
      newPassword: form.value.password,
      confirmPassword: form.value.password_confirmation,
    })
    if (response.error) {
      setErrorsFromResponse(response)
    } else {
      tokenRepo.token.value = response.asJson().jwt
    }
    loading.value = false
  }

  return {
    form,
    update,
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
  useUpdatePassword as default,
  useUpdatePassword,
}
