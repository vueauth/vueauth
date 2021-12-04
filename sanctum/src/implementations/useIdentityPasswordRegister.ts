import getSanctumConfig from '../getSanctumConfig'
import { ref, computed } from 'vue-demi'
import useAuthState from './useAuthState'
import useHandlesErrors from './useHandlesErrors'
import { UseIdentityPasswordRegister } from 'auth-composables'

export const useIdentityPasswordRegister: UseIdentityPasswordRegister = () => {
  const loading = ref(false)
  const { requester } = getSanctumConfig()
  const { register: registerRequest, getUser } = requester

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
    password: '',
    password_confirmation: ''
  })
  const additionalFormFields = ref({
    name: ''
  })
  const mergedForm = computed(() => {
    return { ...form.value, ...additionalFormFields.value }
  })

  const register = async () => {
    loading.value = true
    const registerResponse = await registerRequest(mergedForm.value)
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
    additionalFormFields,
    register,
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

export default useIdentityPasswordRegister
