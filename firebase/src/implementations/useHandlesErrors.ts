import { UseHandlesErrors, useHandlesErrorsBase } from '@vueauth/core'
import { AuthError } from 'firebase/auth'

const useHandlesErrors: UseHandlesErrors = () => {
  const errorService = useHandlesErrorsBase()

  const { resetErrors, errors } = errorService

  function fromResponse (response: AuthError) {
    resetErrors()
    errors.value.push({
      type: response.code.toString() || 'unknown',
      message: response.message || 'unknown error',
    })
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
