import { inject } from 'vue-demi'
import { StrapiAppKey } from './types/symbols'

export const getStrapiConfig = () => {
  const config = inject(StrapiAppKey)
  if (!config) {
    throw new Error(`Could not resolve ${StrapiAppKey.toString()}. Have you installed the plugin?`)
  }
  return config
}

export default getStrapiConfig
