import { computed, ref } from 'vue'
import { UseAuthState } from '@vueauth/core'

const user = ref(null)
const isAuthenticated = computed(() => !!user.value)
const authIsReady = ref(false)

const useVueUseAuthState: UseAuthState = () => {
  return {
    authIsReady,
    isAuthenticated,
    user,
  }
}

export {
  useVueUseAuthState as default,
  useVueUseAuthState,
}
