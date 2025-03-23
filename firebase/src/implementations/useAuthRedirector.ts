import { getAuth } from 'firebase/auth'
import useAuthState from './useAuthState'
import { ref, unref } from 'vue'
import { useRouter } from 'vue-router'
import { UseAuthRedirector, UseAuthRedirectorReturn } from '@vueauth/core'

type UserOnCheckedFunction = (user: unknown | null) => void

const useAuthRedirector: UseAuthRedirector = (
  config = {
    redirectOn: 'authenticated',
    redirectTo: ref('/'),
  },
): UseAuthRedirectorReturn => {
  const checking = ref(false)
  const auth = getAuth()

  config.redirectTo = config.redirectTo ?? ref('/')
  config.router = config.router ?? useRouter()

  const {
    isAuthenticated,
    user,
    authIsReady,
  } = useAuthState()

  const onChecked = ref(null as null | UserOnCheckedFunction)

  function exec () {
    if (typeof onChecked.value === 'function') {
      onChecked.value(user.value)
    }
    checking.value = false
    triggerRedirect()
  }

  function execOnAuthStateEnsured () {
    if (authIsReady.value) {
      return exec()
    }
    return execOnAuthStateChange()
  }

  function handleUnauthenticatedRedirect () {
    if (!isAuthenticated.value && config.redirectOn === 'unauthenticated') {
      if (!config.router) {
        throw new Error('config.router not defined: cannot redirect')
      }
      if (!config.redirectTo) {
        throw new Error('config.redirectTo not defined: cannot redirect')
      }
      config.router.push(unref(config.redirectTo))
    }
  }

  function handleAuthenticatedRedirect () {
    if (isAuthenticated.value && config.redirectOn === 'authenticated') {
      if (!config.router) {
        throw new Error('config.router not defined: cannot redirect')
      }
      if (!config.redirectTo) {
        throw new Error('config.redirectTo not defined: cannot redirect')
      }
      config.router.push(unref(config.redirectTo))
    }
  }

  function execOnAuthStateChange () {
    checking.value = true
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      authIsReady.value = true
      if (typeof onChecked.value === 'function') {
        onChecked.value(authUser)
      }

      handleUnauthenticatedRedirect()
      handleAuthenticatedRedirect()

      checking.value = false
      unsubscribe()
    })
  }

  function triggerRedirect () {
    handleAuthenticatedRedirect()
    handleUnauthenticatedRedirect()
  }

  return {
    execOnAuthStateChange,
    execOnAuthStateEnsured,
    exec,
    redirectTo: config.redirectTo,
    checking,
    onChecked,
  }
}

useAuthRedirector.baseConfig = {}

export {
  useAuthRedirector as default,
  useAuthRedirector,
}
