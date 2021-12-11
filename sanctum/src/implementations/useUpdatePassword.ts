import { ref } from 'vue-demi'
import getSanctumConfig from '../getSanctumConfig'
import useHandlesErrors from './useHandlesErrors'
import { UseUpdatePassword } from 'auth-composables'

export const useUpdatePassword: UseUpdatePassword = () => {
  const loading = ref(false)
  const { requester } = getSanctumConfig()
  const { updatePassword } = requester

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
    const response = await updatePassword(form.value)
    if (response.error) {
      setErrorsFromResponse(response)
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

export default useUpdatePassword
