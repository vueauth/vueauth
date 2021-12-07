import useAuthState from './useAuthState'
import { ref, unref } from 'vue-demi'
import { RouteLocationRaw, useRouter, Router } from 'vue-router'
import { MaybeRef } from '@vueuse/core'
import { RedirectTriggers, UseAuthRedirector } from 'auth-composables'
import useClient from 'src/useClient'

type UserOnCheckedFunction = (user: unknown | null) => void

export const useAuthRedirector: UseAuthRedirector = (
  redirectOn: RedirectTriggers,
  redirectTo: MaybeRef<RouteLocationRaw> = ref('/'),
  router: Router = useRouter()
) => {
  const checking = ref(false)
  const supabase = useClient()

  const {
    isAuthenticated,
    user,
    authIsReady
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
    // if (authIsReady.value) {
    return exec()
    // }
    // return execOnAuthStateChange()
  }

  function handleUnauthenticatedRedirect () {
    if (!isAuthenticated.value && redirectOn === 'unauthenticated') {
      router.push(unref(redirectTo))
    }
  }

  function handleAuthenticatedRedirect () {
    if (isAuthenticated.value && redirectOn === 'authenticated') {
      router.push(unref(redirectTo))
    }
  }

  function execOnAuthStateChange () {
    checking.value = true
    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      authIsReady.value = true
      if (typeof onChecked.value === 'function') {
        onChecked.value(session?.user)
      }

      handleUnauthenticatedRedirect()
      handleAuthenticatedRedirect()

      checking.value = false
      data?.unsubscribe()
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
    redirectTo,
    checking,
    onChecked
  }
}

export default useAuthRedirector
