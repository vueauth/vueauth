import { App } from 'vue'

import {
  useIdentityPasswordRegister,
  IndexedDbPlugin,
  useAuthState,
  useIdentityPasswordLogin,
  useIdentityPasswordLogout,
  useFetchUser,
  useUpdatePassword,
  usePasswordResetViaEmail,
  useUnauthenticatedRedirector,
  useAuthenticatedRedirector,
  useAuthRedirector,
  useHandlesErrors
} from '@vueauth/indexeddb'

export function registerFunction (app: App) {
  app.use(IndexedDbPlugin, { useAuthState })
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
