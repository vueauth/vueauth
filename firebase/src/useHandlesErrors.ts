import { ref, computed } from 'vue-demi'
import ResponseErrors from './firebase/types/ResponseErrors'
import { UseHandlesErrors, ValidationErrors } from 'auth-composables'
import { FirebaseError } from 'firebase/util'

export const useHandlesErrors: UseHandlesErrors = () => {
  const errors = ref<ResponseErrors>([])
  const hasErrors = computed(() => !!errors.value.length)
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

  function fromResponse (response: FirebaseError) {
    resetErrors()
    errors.value.push({
      type: response.code.toString() || 'unknown',
      message: response.message || 'unknown error'
    })
    // if (response.statusCode === 422 && response.asJson()?.errors) {
    //   const errorBag = response.asJson().errors as ValidationErrors
    //   validationErrors.value = errorBag
    // }
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
