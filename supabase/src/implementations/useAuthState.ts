import { computed, ref } from 'vue-demi'
import { createGlobalState } from '@vueuse/shared'
import { UseAuthState, AuthState } from 'auth-composables'
import useClient from '../useClient'

export const useAuthState: UseAuthState = createGlobalState<AuthState>(() => {
  const supabase = useClient()

  const user = ref(supabase.auth.user())
  const isAuthenticated = computed(() => !!user.value)
  const authIsReady = ref(!!user.value)

  supabase.auth.onAuthStateChange((_, session) => {
    user.value = session?.user ?? null
  })

  return {
    authIsReady,
    isAuthenticated,
    user
  }
})

export default useAuthState
