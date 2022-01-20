import { getAuth } from 'firebase/auth'
import { getApp } from 'firebase/app'
import { computed, ref } from 'vue-demi'
import { createGlobalState } from '@vueuse/shared'
import { UseAuthState, AuthState } from '@vueauth/core'

const useAuthState: UseAuthState = createGlobalState<AuthState>(() => {
  const app = getApp()
  const auth = getAuth(app)

  const user = ref(auth.currentUser)
  const isAuthenticated = computed(() => !!user.value)
  const authIsReady = ref(!!user.value)

  auth.onIdTokenChanged(authUser => {
    user.value = authUser
  })

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
