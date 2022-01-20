import { UseHandlesErrors, useHandlesErrorsBase } from '@vueauth/core'
import { ApiError } from '@supabase/supabase-js'

const useHandlesErrors: UseHandlesErrors = () => {
  const errorService = useHandlesErrorsBase()

  const { resetErrors, errors } = errorService

  function fromResponse (error: ApiError) {
    resetErrors()
    errors.value.push({
      type: `CODE: ${error.status}`,
      message: error.message,
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
