import { ref } from 'vue'
import useAuthState from './useAuthState'
import { useHandlesErrors, UseIdentityPasswordLogout } from '@vueauth/core'
import { state } from 'src/plugin/state'

const useIdentityPasswordLogout: UseIdentityPasswordLogout = () => {
  const loading = ref(false)

  const db = state.db

  const { user } = useAuthState()
  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  } = useHandlesErrors()

  const logout = async () => {
    resetStandardErrors()

    loading.value = true

    try {
      await db?.logout()
      user.value = null
    } catch (e: any) {
      if ('message' in e) errors.value.push({ message: e.message, type: 'logout' })
      else errors.value.push({ message: 'unknown error while logging out', type: 'unknown' })
    } finally {
      loading.value = false
    }
  }

  return {
    logout,
    loading,

    // Error Handling
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  }
}

export {
  useIdentityPasswordLogout as default,
  useIdentityPasswordLogout,
}
