import { boot } from 'quasar/wrappers'
import { AuthPlugin } from '@vueauth/core'

import { makeFetchRequester, useVueUseAuthState } from '@vueauth/sanctum'

import {
  SanctumPlugin,
  useIdentityPasswordRegister,
  useIdentityPasswordLogin,
  useIdentityPasswordLogout,
  useUnauthenticatedRedirector,
  useAuthRedirector,
  useHandlesErrors,
  useAuthState,
  useAuthenticatedRedirector,
  useFetchUser,
  usePasswordResetViaEmail,
  useUpdatePassword
} from '@vueauth/sanctum'

export default boot(({ app }) => {
  app.use(SanctumPlugin, {
    /**
     * By default, Quasar Auth will make requests using Fetch.
     * If you want to use a different library for backend
     * requests you can provide an implemntation here.
     */
    requester: makeFetchRequester,
  
    /**
     * Quasar Auth uses "createGlobalState" from "vueuse" to store
     * the user. Feel free to use your own by implementing
     * the UseAuthState contract and passing it below.
     */
    useAuthState: useVueUseAuthState,
  
    /**
     * You may want to configure the endpoints Sanctum uses. We use
     * sensible defaults aligned with fortify, but you can of
     * course configure your own.
     */
    endpoints: {
      login: '/login',
      register: '/register',
      logout: '/logout',
      getUser: 'api/user',
      csrfCookie: '/sanctum/csrf-cookie',
      resetPassword: '/reset-password',
      forgotPassword: '/forgot-password',
      password: '/user/password'
    }
  })

  app.use(AuthPlugin, {
    default: 'sanctum',
    providers: {
      sanctum: {
        features: {
          'identityPassword:register': useIdentityPasswordRegister,
          'identityPassword:login': useIdentityPasswordLogin,
          'identityPassword:logout': useIdentityPasswordLogout,
          unauthenticatedRedirector: useUnauthenticatedRedirector,
          authenticatedRedirector: useAuthenticatedRedirector,
          errorHandler: useHandlesErrors,
          fetchUser: useFetchUser,
          authState: useAuthState,
          authRedirector: useAuthRedirector,
          passwordResetViaEmail: usePasswordResetViaEmail,
          updatePassword: useUpdatePassword
        }
      }
    }
  })
})
