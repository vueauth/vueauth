import { ref } from 'vue-demi'
import useHandlesErrors from './useHandlesErrors'
import useAuthState from './useAuthState'
import { UseIdentityPasswordLogout } from '@vueauth/core'
import { getTokenRepo } from 'src/helpers/getTokenRepo'

const useIdentityPasswordLogout: UseIdentityPasswordLogout = () => {
  const loading = ref(false)
  const tokenRepo = getTokenRepo()

  const { user } = useAuthState()
  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
  } = useHandlesErrors()

  const logout = async () => {
    loading.value = true
    tokenRepo.remove()
    user.value = null
    loading.value = false
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
