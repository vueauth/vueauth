import useHandlesErrors from './useHandlesErrors'
import { ref } from 'vue-demi'
import { UseUpdatePassword } from '@vueauth/core'
import useClient from '../useClient'

const useUpdatePassword: UseUpdatePassword = () => {
  const loading = ref(false)

  const supabase = useClient()

  const {
    errors,
    hasErrors,
    fromResponse: setErrorsFromResponse,
    validationErrors,
    hasValidationErrors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
  } = useHandlesErrors()

  const form = ref({
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
    const { error } = await supabase.auth.update({ password: form.value.password })
    if (error) setErrorsFromResponse(error)
    loading.value = false
  }

  return {
    form,
    update,
    loading,
    resetForm,

    // error Handling
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
