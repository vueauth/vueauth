import { App } from 'vue'

import {
  SupabasePlugin,
  useIdentityPasswordLogin as useSupabaseIdentityPasswordLogin,
  useIdentityPasswordLogout as useSupabaseIdentityPasswordLogout,
  useIdentityPasswordRegister as useSupabaseIdentityPasswordRegister,
  useUnauthenticatedRedirector as useSupabaseUnauthenticatedRedirector,
  useAuthRedirector as useSupabaseAuthRedirector,
  useHandlesErrors as useSupabaseHandlesErrors,
  useAuthState as useSupabaseAuthState,
  useAuthenticatedRedirector as useSupabaseAuthenticatedRedirector,
  useFetchUser as useSupabaseFetchUser,
  usePasswordResetViaEmail as useSupabasePasswordResetViaEmail,
} from '@vueauth/supabase'

const supabaseCredentials = {
  supabaseUrl: 'https://uqzabkzhrgumibxtlgze.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODY1ODIzOCwiZXhwIjoxOTU0MjM0MjM4fQ.ovHqt7Tt6s8zW_skC8Asa0fYGHrocovyYkXkKUXtGMQ',
}

export function registerFunction (app: App) {
  app.use(SupabasePlugin, { credentials: supabaseCredentials })
}

export const vueAuthConfig = {
  features: {
    'identityPassword:register': useSupabaseIdentityPasswordRegister,
    'identityPassword:login': useSupabaseIdentityPasswordLogin,
    'identityPassword:logout': useSupabaseIdentityPasswordLogout,
    unauthenticatedRedirector: useSupabaseUnauthenticatedRedirector,
    authenticatedRedirector: useSupabaseAuthenticatedRedirector,
    errorHandler: useSupabaseHandlesErrors,
    fetchUser: useSupabaseFetchUser,
    authState: useSupabaseAuthState,
    authRedirector: useSupabaseAuthRedirector,
    passwordResetViaEmail: useSupabasePasswordResetViaEmail,
  },
}
