import { computed, ref } from 'vue'
import { UseAuthState } from '@vueauth/core'
import { watchLocalStorage } from 'src/utils/watchLocalStorage'

const isAuthenticatedRef = ref(!!localStorage.getItem('authenticatedUserEmail'))

watchLocalStorage('authenticatedUserEmail', (newVal, oldVal) => {
  isAuthenticatedRef.value = !!newVal
  authIsReady.value = true
})

const user = ref(null)
const isAuthenticated = computed(() => !!user.value)
const authIsReady = ref(!isAuthenticatedRef.value)

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
