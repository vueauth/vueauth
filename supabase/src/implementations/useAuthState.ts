import { computed, ref } from 'vue'
import { UseAuthState } from '@vueauth/core'

const user = ref(null)
const isAuthenticated = computed(() => !!user.value)
const authIsReady = ref(true)

const useAuthState: UseAuthState = () => {
  return {
    authIsReady,
    isAuthenticated,
    user,
  }
}

export {
  useAuthState as default,
  useAuthState,
}
