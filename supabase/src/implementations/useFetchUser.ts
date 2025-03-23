import { ref } from 'vue'
import useHandlesErrors from './useHandlesErrors'
import { UseFetchUser } from '@vueauth/core'
import useClient from '../useClient'

const useFetchUser: UseFetchUser = () => {
  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  } = useHandlesErrors()

  const loading = ref(false)

  const supabase = useClient()

  function fetch () {
    return new Promise(resolve => {
      const user = supabase.auth.user()
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
