import { getAuth } from 'firebase/auth'
import { ref } from 'vue'
import useHandlesErrors from './useHandlesErrors'
import { UseFetchUser } from '@vueauth/core'

const useFetchUser: UseFetchUser = () => {
  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  } = useHandlesErrors()

  const loading = ref(false)

  const auth = getAuth()

  function fetch () {
    return new Promise(resolve => {
      const user = auth.currentUser
      resolve(user)
    })
  }

  return {
    loading,
    fetch,
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
