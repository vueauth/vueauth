import { ref } from 'vue'
import useAuthState from './useAuthState'
import { UseFetchUser, useHandlesErrors } from '@vueauth/core'
import { state } from 'src/plugin/state'

const loading = ref(false)

const useFetchUser: UseFetchUser = () => {
  const db = state.db

  const { user, authIsReady } = useAuthState()

  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  } = useHandlesErrors()

  const fetch = async () => {
    loading.value = true
    try {
      const authenticatedUser = await db?.getAuthenticatedUser()
      if (authenticatedUser) {
        user.value = authenticatedUser
        authIsReady.value = true
      } else {
        throw new Error('user not found')
      }
    } catch (e: any) {
      if ('message' in e) errors.value.push({ message: e.message, type: 'fetch-user' })
      else errors.value.push({ message: 'unknown error while fetching user', type: 'unknown' })
    } finally {
      loading.value = false
    }
  }

  return {
    fetch,
    loading,

    // Error Handling
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  }
}

export {
  useFetchUser as default,
  useFetchUser,
}
