import { boot } from 'quasar/wrappers'
import { AuthPlugin } from '@vueauth/core'

import {
  SupabasePlugin,
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
} from '@vueauth/supabase'

export default boot(({ app }) => {
  app.use(SupabasePlugin, {
    credentials: {
      supabaseUrl: 'https://xxxxxxxxxxxxxxxxxxxx.supabase.co',
      supabaseKey: 'XXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXXx.XXXXXXXXXXXXX'
    }
  })

  app.use(AuthPlugin, {
    default: 'supabase',
    providers: {
      supabase: {
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
