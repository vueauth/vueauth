import { getDefaultProvider } from './getDefaultProvider'
import { inject } from 'vue-demi'

type UseFeatureOptionsReturn = Record<string, unknown>

type UseAllOptionsReturn = Record<string, UseFeatureOptionsReturn>

type UseOptionsReturn = UseFeatureOptionsReturn | UseAllOptionsReturn

export const getOptions = (authProvider = '', featureId = ''): UseOptionsReturn => {
  if (!authProvider) {
    authProvider = getDefaultProvider()
  }

  if (featureId) {
    return inject(Symbol.for(`auth:${authProvider}.${featureId}.options`)) as UseFeatureOptionsReturn
  } else {
    return inject(Symbol.for(`auth:${authProvider}.options`)) as UseAllOptionsReturn
  }
}
