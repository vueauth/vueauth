import { App } from 'vue'

import {
  SanctumPlugin,
  useIdentityPasswordLogin,
  useIdentityPasswordLogout,
  useIdentityPasswordRegister,
  useUnauthenticatedRedirector,
  useAuthRedirector,
  useHandlesErrors,
  useAuthState,
  useAuthenticatedRedirector,
  useFetchUser,
  usePasswordResetViaEmail,
} from '@vueauth/sanctum'

export function registerFunction (app: App) {
  app.use(SanctumPlugin, {
    endpoints: {
      login: 'sanctum/login',
      register: 'sanctum/register',
      logout: 'sanctum/logout',
      getUser: 'sanctum/api/user',
      csrfCookie: 'sanctum/csrf-cookie',
      resetPassword: 'sanctum/reset-password',
      forgotPassword: 'sanctum/forgot-password',
      password: 'sanctum/user/password',
    },
  })
}

export const vueAuthConfig = {
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
  },
}
