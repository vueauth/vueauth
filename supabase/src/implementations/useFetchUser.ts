import { ref } from 'vue-demi'
import useHandlesErrors from './useHandlesErrors'
import { UseFetchUser } from 'auth-composables'
import useClient from '../useClient'

export const useFetchUser: UseFetchUser = () => {
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

export default useFetchUser
