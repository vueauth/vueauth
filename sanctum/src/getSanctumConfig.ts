import { inject } from 'vue-demi'
import { SanctumAppKey } from './types/symbols'

export const getSanctumConfig = () => {
  const config = inject(SanctumAppKey)
  if (!config) {
    throw new Error(`Could not resolve ${SanctumAppKey.toString()}. Have you installed the plugin?`)
  }
  return config
}

export default getSanctumConfig
