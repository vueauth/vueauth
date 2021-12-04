import { ref, computed } from 'vue-demi'
import ResponseErrors from './types/ResponseErrors'
import { UseHandlesErrors, ValidationErrors } from 'auth-composables'
import { AuthError } from 'firebase/auth'

export const useHandlesErrors: UseHandlesErrors = () => {
  const errors = ref<ResponseErrors>([])
  const hasErrors = computed(() => !!errors.value.length || !!validationErrors.value.length)
  function resetStandardErrors () {
    errors.value = []
  }

  const validationErrors = ref<ValidationErrors>({})
  const hasValidationErrors = computed(() => {
    return !!Object.keys(validationErrors.value).length
  })
  function resetValidationErrors () {
    validationErrors.value = {}
  }

  function resetErrors () {
    resetStandardErrors()
    resetValidationErrors()
  }

  function fromResponse (response: AuthError) {
    resetErrors()
    errors.value.push({
      type: response.code.toString() || 'unknown',
      message: response.message || 'unknown error'
    })
  }

  return {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
    fromResponse
  }
}

export default useHandlesErrors
