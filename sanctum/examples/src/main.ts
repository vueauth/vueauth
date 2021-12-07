import { createApp } from 'vue'
import App from './App.vue'
import { AuthPlugin } from 'auth-composables'
import { PluginOptions } from 'auth-composables/src/Types/PluginOptions'
import {
  SanctumPlugin,
  useAuthenticatedRedirector, useUnauthenticatedRedirector, useAuthRedirector,
  useIdentityPasswordLogout, useIdentityPasswordLogin, useIdentityPasswordRegister,
  useHandlesErrors, useFetchUser, useAuthState, usePasswordResetViaEmail
} from 'sanctum-composables'
import router from './router/router'

const app = createApp(App)

app.use(router)
app.use(SanctumPlugin)
app.use(AuthPlugin, {
  default: 'sanctum',
  providers: {
    sanctum: {
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
        'passwordResetViaEmail': usePasswordResetViaEmail,
      }
    }
  }
} as PluginOptions)

app.mount('#app')
