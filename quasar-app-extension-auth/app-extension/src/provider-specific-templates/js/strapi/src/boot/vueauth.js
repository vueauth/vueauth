import { boot } from 'quasar/wrappers'
import { AuthPlugin } from '@vueauth/core'

import { makeFetchRequester, useVueUseAuthState, useLocalStorageTokenRepo } from '@vueauth/strapi'

import {
  StrapiPlugin,
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
} from '@vueauth/strapi'

export default boot(({ app }) => {
  app.use(StrapiPlugin, {
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
     * When making requests, strapi uses the repo below to get
     * the 'Bearer' token. By default we use localStorage
     * yet you can provide your own implementation.
     */
    useTokenRepo: useLocalStorageTokenRepo,
  
    /**
     * You may want to configure the endpoints Sanctum uses. We use
     * sensible defaults aligned with fortify, but you can of
     * course configure your own.
     */
    endpoints: {
      login: 'api/auth/local',
      register: 'api/auth/local/register',
      getUser: 'api/users/me',
      resetPassword: 'api/auth/reset-password',
      forgotPassword: 'api/auth/forgot-password',
      changePassword: 'api/update-password'
    }
  })

  app.use(AuthPlugin, {
    default: 'strapi',
    providers: {
      strapi: {
        features: {
          'identityPassword:register': {
            composable: useIdentityPasswordRegister,
            config: { withUsername: false }
          },
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
