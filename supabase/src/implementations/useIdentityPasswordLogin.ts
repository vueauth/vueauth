import useHandlesErrors from './useHandlesErrors'
import { ref, watch } from 'vue-demi'
import { UseIdentityPasswordLogin } from '@vueauth/core'
import useClient from '../useClient'

const useIdentityPasswordLogin: UseIdentityPasswordLogin = () => {
  const loading = ref(false)

  const supabase = useClient()

  const {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
    resetStandardErrors,
    resetValidationErrors,
  } = useHandlesErrors()

  const form = ref({
    email: '',
    password: '',
  })
  function resetForm () {
    Object.keys(form.value).forEach(key => { form.value[key] = '' })
  }

  watch(form.value, () => {
    resetErrors()
  })

  const login = async () => {
    loading.value = true
    const { error } = await supabase.auth.signIn(form.value)
    if (error) setErrorsFromResponse(error)
    loading.value = false
  }

  return {
    form,
    login,
    loading,
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetErrors,
    resetStandardErrors,
    resetValidationErrors,
    resetForm,
  }
}

export {
  useIdentityPasswordLogin as default,
  useIdentityPasswordLogin,
}
