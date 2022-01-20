import { computed, ref } from 'vue-demi'
import { createGlobalState } from '@vueuse/shared'
import { UseAuthState, AuthState } from '@vueauth/core'

const useAuthState: UseAuthState = createGlobalState<AuthState>(() => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const authIsReady = ref(true)

  return {
    authIsReady,
    isAuthenticated,
    user,
  }
})

export {
  useAuthState as default,
  useAuthState,
}
