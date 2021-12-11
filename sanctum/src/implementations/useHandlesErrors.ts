import { ref, computed } from 'vue-demi'
import ResponseErrors from '../types/ResponseErrors'
import { SanctumResponse } from '../types/Requester'
import { UseHandlesErrors, ValidationErrors } from 'auth-composables'

export const useHandlesErrors: UseHandlesErrors = () => {
  const errors = ref<ResponseErrors>([])
  function resetStandardErrors () {
    errors.value = []
  }

  const validationErrors = ref<ValidationErrors>({})
  const hasValidationErrors = computed(() => {
    return !!Object.keys(validationErrors.value).length
  })
  const hasErrors = computed(() => !!errors.value.length || hasValidationErrors.value)

  function resetValidationErrors () {
    validationErrors.value = {}
  }

  function resetErrors () {
    resetStandardErrors()
    resetValidationErrors()
  }

  function fromResponse (response: SanctumResponse<unknown>) {
    resetErrors()
    errors.value.push({
      type: response.statusCode?.toString() || 'unknown',
      message: response.response?.statusText || 'unknown error',
    })
    if (response.statusCode === 422 && response.asJson()?.errors) {
      const errorBag = response.asJson()?.errors as ValidationErrors
      validationErrors.value = errorBag
    }
  }

  return {
    validationErrors,
    hasValidationErrors,
    hasErrors,
    errors,
    resetStandardErrors,
    resetValidationErrors,
    resetErrors,
    fromResponse,
  }
}

export default useHandlesErrors
