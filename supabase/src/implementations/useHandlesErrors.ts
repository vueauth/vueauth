import { ref, computed } from 'vue-demi'
import ResponseErrors from '../types/ResponseErrors'
import { UseHandlesErrors, ValidationErrors } from 'auth-composables'
import { ApiError } from '@supabase/supabase-js'

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

  function fromResponse (error: ApiError) {
    resetErrors()
    errors.value.push({
      type: `CODE: ${error.status}`,
      message: error.message
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
