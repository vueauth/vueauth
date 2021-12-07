import { createApp } from 'vue'
import {
  SupabasePlugin,
  useIdentityPasswordLogin,
  useIdentityPasswordLogout,
  useIdentityPasswordRegister,
  useUnauthenticatedRedirector,
  useAuthRedirector,
  useHandlesErrors,
  useAuthState,
  useAuthenticatedRedirector,
  useFetchUser,
  usePasswordResetViaEmail
} from 'supabase-composables'
import { AuthPlugin, PluginOptions } from 'auth-composables'
import App from './App.vue'
import router from './router/router'

const app = createApp(App)

const supabaseCredentials = {
  supabaseUrl: 'https://uqzabkzhrgumibxtlgze.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODY1ODIzOCwiZXhwIjoxOTU0MjM0MjM4fQ.ovHqt7Tt6s8zW_skC8Asa0fYGHrocovyYkXkKUXtGMQ',
}

app.use(router)

app.use(SupabasePlugin, { credentials: supabaseCredentials })

app.use(AuthPlugin, {
  default: 'supabase',
  providers: {
    supabase: {
      features: {
        'identityPassword:register': useIdentityPasswordRegister,
        'identityPassword:login': useIdentityPasswordLogin,
        'identityPassword:logout': useIdentityPasswordLogout,
        'unauthenticatedRedirector': useUnauthenticatedRedirector,
        'authenticatedRedirector': useAuthenticatedRedirector,
        'errorHandler': useHandlesErrors,
        'fetchUser': useFetchUser,
        'authState': useAuthState,
        'authRedirector': useAuthRedirector,
        'passwordResetViaEmail': usePasswordResetViaEmail
      }
    }
  }
} as PluginOptions)

app.mount('#app')
