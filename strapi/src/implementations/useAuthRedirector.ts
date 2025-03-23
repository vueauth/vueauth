import useAuthState from '../implementations/useAuthState'
import { ref, unref, watch, WatchStopHandle, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import useFetchUser from '../implementations/useFetchUser'
import { UseAuthRedirector, UseAuthRedirectorReturn } from '@vueauth/core'

type UserOnCheckedFunction = (user: unknown | null) => void

const useAuthRedirector: UseAuthRedirector = (
  config = {
    redirectOn: 'authenticated',
    redirectTo: ref('/'),
  },
): UseAuthRedirectorReturn => {
  const checking = ref(false)
  const { loading: fetchingUser, fetch: fetchUser } = useFetchUser()

  config.redirectTo = config.redirectTo ?? ref('/')
  config.router = config.router ?? useRouter()

  const {
    isAuthenticated,
    user,
    authIsReady,
  } = useAuthState()

  watchEffect(() => {
    if (user.value !== null) {
      authIsReady.value = true
    }
  })

  const onChecked = ref(null as null | UserOnCheckedFunction)

  function exec () {
    if (typeof onChecked.value === 'function') {
      onChecked.value(user.value)
    }
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
      if (location) {
        config.router.push(unref(config.redirectTo ?? ''))
      }
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
      config.router.push(unref(config.redirectTo ?? ''))
    }
  }

  let authReadyWatcher: WatchStopHandle | undefined
  function execOnAuthStateChange () {
    if (authIsReady.value === false) {
      checking.value = true
      authReadyWatcher = watch(authIsReady, newAuthIsReady => {
        authIsReady.value = newAuthIsReady
        if (typeof onChecked.value === 'function') {
          onChecked.value(user)
        }

        handleUnauthenticatedRedirect()
        handleAuthenticatedRedirect()

        checking.value = false
        if (authReadyWatcher !== undefined) {
          authReadyWatcher()
        }
      })
    }

    if (fetchingUser.value === false) {
      fetchUser()
    }
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
