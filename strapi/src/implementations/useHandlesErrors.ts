import { StrapiResponse, ErrorResponse } from '../types/MakeRequester'
import { UseHandlesErrors, useHandlesErrorsBase, ValidationErrors } from '@vueauth/core'

const useHandlesErrors: UseHandlesErrors = () => {
  const errorService = useHandlesErrorsBase()

  const { resetErrors, errors, validationErrors } = errorService

  const handlers: Record<number, (errorResponse: ErrorResponse) => void> = {
    400: (errorResponse) => {
      resetErrors()

      const error = errorResponse.error
      if (error.name === 'ValidationError' && error.details?.errors) {
        const result: ValidationErrors = {}
        error.details.errors.forEach(error => {
          if (error.name !== 'ValidationError') {
            return
          }

          if (Array.isArray(result[error.path.join('.')])) {
            result[error.path.join('.')].push(error.message)
          } else {
            result[error.path.join('.')] = [error.message]
          }
        })

        validationErrors.value = result
      }
      errors.value.push({ type: error.name, message: error.message })
    },
  }

  function fromResponse (response: StrapiResponse<ErrorResponse>) {
    resetErrors()
    errors.value.push({
      type: response.statusCode?.toString() || 'unknown',
      message: response.response?.statusText || 'unknown error',
    })
    if (response.response && response.statusCode && handlers[response.statusCode]) {
      handlers[response.statusCode](response.asJson())
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
