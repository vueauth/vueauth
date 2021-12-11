import getSanctumConfig from '../getSanctumConfig'
import { ref, computed } from 'vue-demi'
import useAuthState from './useAuthState'
import useHandlesErrors from './useHandlesErrors'
import { UseIdentityPasswordRegister, IdentityPasswordRegisterOptions } from 'auth-composables'

const baseOptions: IdentityPasswordRegisterOptions = {
  emailConfirm: false,
}

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
    fromResponse: setErrorsFromResponse,
  } = useHandlesErrors()

  const form = ref({
    email: '',
    password: '',
    password_confirmation: '',
  })
  const customFields = ref({ name: '' })
  const mergedForm = computed(() => {
    return { ...form.value, ...customFields.value }
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
    Object.keys(mergedForm.value).forEach(key => { mergedForm.value[key] = '' })
  }

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
    customFields,
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

useIdentityPasswordRegister.baseOptions = baseOptions

export default useIdentityPasswordRegister
