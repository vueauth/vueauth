import { getAuth } from 'firebase/auth'
import { getApp } from 'firebase/app'
import { computed, ref, Ref } from 'vue'
import type { UseAuthState } from '@vueauth/core'

// singleton refs (created once per app instance)
const user: Ref<ReturnType<typeof getAuth>['currentUser'] | null> = ref(null)
const authIsReady = ref(false)
const isAuthenticated = computed(() => !!user.value)

let initialized = false

const useAuthState: UseAuthState = () => {
  if (!initialized) {
    const app = getApp()
    const auth = getAuth(app)

    user.value = auth.currentUser
    authIsReady.value = !!user.value

    auth.onIdTokenChanged(authUser => {
      user.value = authUser
      authIsReady.value = true
    })

    initialized = true
  }

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
