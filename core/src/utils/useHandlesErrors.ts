import { ref, computed } from 'vue-demi'
import ResponseErrors from '../types/ResponseErrors'
import { ValidationErrors } from '../types/ValidationErrors'

export const useHandlesErrors = () => {
  // Standard Errors
  const errors = ref<ResponseErrors>([])
  function resetStandardErrors () {
    errors.value = []
  }
  const hasStandardErrors = computed(() => {
    return !!errors.value.length
  })

  // Validation Errors
  const validationErrors = ref<ValidationErrors>({})
  const hasValidationErrors = computed(() => {
    return !!Object.keys(validationErrors.value).length
  })
  function resetValidationErrors () {
    validationErrors.value = {}
  }

  // All Errors
  const hasErrors = computed(() => hasStandardErrors.value || hasValidationErrors.value)
  function resetErrors () {
    resetStandardErrors()
    resetValidationErrors()
  }

  return {
    errors,
    hasStandardErrors,
    resetStandardErrors,

    validationErrors,
    hasValidationErrors,
    resetValidationErrors,

    hasErrors,
    resetErrors,
  }
}

export default useHandlesErrors
