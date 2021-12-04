import { createGlobalState } from '@vueuse/shared'

export const useGlobalState = createGlobalState(() => {
  return {
    authIsReady: false
  }
})
