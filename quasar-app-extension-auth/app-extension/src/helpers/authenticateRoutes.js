import { useRouter } from 'vue-router'
import { useAuthenticatedRedirector, useUnauthenticatedRedirector } from '@vueauth/core'
import { Loading } from 'quasar'
import { unref } from 'vue'


export const authenticateRoutes = () => {
  const router = useRouter()

  const authenticatedRedirector = useAuthenticatedRedirector({ redirectTo: { name: 'dashboard' }, router })
  const unauthenticatedRedirector = useUnauthenticatedRedirector({ redirectTo: { name: 'auth.login' }, router })

  authenticatedRedirector.onChecked.value = () => Loading.hide()
  unauthenticatedRedirector.onChecked.value = () => Loading.hide()

  router.isReady().then(() => {
    const route = unref(router.currentRoute)

    if (route.meta.authOnly) {
      Loading.show()
      unauthenticatedRedirector.execOnAuthStateEnsured()
    }

    if (route.meta.unauthOnly) {
      authenticatedRedirector.execOnAuthStateEnsured()
    }
  })

  router.beforeEach((to, from) => {
    if (to.meta.authOnly) {
      Loading.show()
      unauthenticatedRedirector.execOnAuthStateEnsured()
    }

    if (to.meta.unauthOnly) {
      authenticatedRedirector.execOnAuthStateEnsured()
    }
  })
}
