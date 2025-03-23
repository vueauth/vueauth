import { inject } from 'vue'
import { IndexedDbAppKey } from './types/symbols'

export const getIndexedDbConfig = () => {
  const config = inject(IndexedDbAppKey)
  if (!config) {
    throw new Error(`Could not resolve ${IndexedDbAppKey.toString()}. Have you installed the plugin?`)
  }
  return config
}

export default getIndexedDbConfig
