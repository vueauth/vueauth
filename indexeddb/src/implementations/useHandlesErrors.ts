import { UseHandlesErrors, useHandlesErrorsBase } from '@vueauth/core'

const useHandlesErrors: UseHandlesErrors = () => {
  const errorService = useHandlesErrorsBase()

  return {
    ...errorService,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fromResponse: () => {},
  }
}

export {
  useHandlesErrors as default,
  useHandlesErrors,
}
