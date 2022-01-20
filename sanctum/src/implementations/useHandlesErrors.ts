import { SanctumResponse } from '../types/MakeRequester'
import { UseHandlesErrors, ValidationErrors, useHandlesErrorsBase } from '@vueauth/core'

const useHandlesErrors: UseHandlesErrors = () => {
  const errorService = useHandlesErrorsBase()

  const { resetErrors, errors, validationErrors } = errorService

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
    ...errorService,
    fromResponse,
  }
}

export {
  useHandlesErrors as default,
  useHandlesErrors,
}
