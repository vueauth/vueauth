import useHandlesErrors from './useHandlesErrors'
import { ref } from 'vue-demi'
import { UseIdentityPasswordLogout } from 'auth-composables'
import useClient from '../useClient'

export const useIdentityPasswordLogout: UseIdentityPasswordLogout = () => {
  const loading = ref(false)

  const supabase = useClient()

  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
  } = useHandlesErrors()

  const logout = async () => {
    loading.value = true
    const { error } = await supabase.auth.signOut()
    if (error) setErrorsFromResponse(error)
    loading.value = false
  }

  return {
    logout,
    loading,
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  }
}
