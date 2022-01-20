import { getDefaultProvider } from './getDefaultProvider'
import { inject } from 'vue-demi'

type UseFeatureConfigsReturn = Record<string, unknown>

type UseAllConfigsReturn = Record<string, UseFeatureConfigsReturn>

export const getConfig = <ConfigInterface>(featureId = '', authProvider = ''): ConfigInterface | UseAllConfigsReturn => {
  authProvider = authProvider || getDefaultProvider()

  let config
  if (featureId) {
    config = inject<ConfigInterface>(Symbol.for(`auth:${authProvider}.${featureId}.config`))
    return config ?? {}
  } else {
    config = inject<UseAllConfigsReturn>(Symbol.for(`auth:${authProvider}.config`))
    return config ?? {}
  }
}
