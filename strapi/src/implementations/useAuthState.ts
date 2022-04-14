import getStrapiConfig from '../getStrapiConfig'
import { UseAuthState } from '@vueauth/core'

const useAuthState: UseAuthState = () => {
  const config = getStrapiConfig()
  return config.useAuthState()
}

export {
  useAuthState as default,
  useAuthState,
}
