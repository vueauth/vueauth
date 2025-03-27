import { ref } from 'vue'
import getStrapiConfig from '../getStrapiConfig'
import useHandlesErrors from './useHandlesErrors'
import useAuthState from './useAuthState'
import { UseFetchUser } from '@vueauth/core'

const loading = ref(false)

const useFetchUser: UseFetchUser = () => {
  const { makeRequester } = getStrapiConfig()
  const { getUser } = makeRequester()

  const { user, authIsReady } = useAuthState()
  const {
    hasErrors,
    errors,
    resetStandardErrors,
    resetErrors,
    fromResponse: setErrorsFromResponse,
  } = useHandlesErrors()

  const fetch = async () => {
    loading.value = true
    const response = await getUser()
    if (response.error) {
      setErrorsFromResponse(response)
      loading.value = false
      authIsReady.value = true
      return
    }

    authIsReady.value = true
    user.value = response.asJson()
    loading.value = false
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
