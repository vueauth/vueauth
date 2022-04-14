import { App } from 'vue'

import {
  StrapiPlugin,
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
  useUpdatePassword,
} from '@vueauth/strapi'

export function registerFunction (app: App) {
  app.use(StrapiPlugin, {})
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
    updatePassword: useUpdatePassword,
  },
}
