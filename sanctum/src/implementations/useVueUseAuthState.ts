import { computed, ref } from 'vue-demi'
import { createGlobalState } from '@vueuse/shared'
import { UseAuthState, AuthState } from 'auth-composables'

export const useVueUseAuthState: UseAuthState = createGlobalState<AuthState>(() => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)
  const authIsReady = ref(false)

  return {
    authIsReady,
    isAuthenticated,
    user
  }
})

export default useVueUseAuthState
