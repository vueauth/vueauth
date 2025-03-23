import { createApp } from 'vue'
import App from './App.vue'
import { AuthPlugin } from '@vueauth/core'
import { PluginOptions } from '@vueauth/core'
import {
  SanctumPlugin,
  useAuthenticatedRedirector, useUnauthenticatedRedirector, useAuthRedirector,
  useIdentityPasswordLogout, useIdentityPasswordLogin, useIdentityPasswordRegister,
  useHandlesErrors, useFetchUser, useAuthState, usePasswordResetViaEmail, useUpdatePassword
} from '@vueauth/sanctum'
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
        'updatePassword': useUpdatePassword
      }
    }
  }
} as PluginOptions)

app.mount('#app')
