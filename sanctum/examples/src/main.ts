import { createApp } from 'vue'
import App from './App.vue'
import { VuePlugin } from 'auth-composables'
import { PluginOptions } from 'auth-composables/src/vuePlugin'
import {
  sanctumPlugin,
  useAuthenticatedRedirector, useUnauthenticatedRedirector, useAuthRedirector,
  useLogout, useIdentityPasswordLogin, useIdentityPasswordRegister,
  useHandlesErrors, useFetchUser, useAuthState
} from 'sanctum-composables'
import router from './router/router'

const app = createApp(App)

app.use(router)
app.use(sanctumPlugin)
app.use(VuePlugin, {
  default: 'sanctum',
  providers: {
    sanctum: {
      features: {
        'identityPassword:register': useIdentityPasswordRegister,
        'identityPassword:login': useIdentityPasswordLogin,
        'identityPassword:logout': useLogout,
        'unauthenticatedRedirector': useUnauthenticatedRedirector,
        'authenticatedRedirector': useAuthenticatedRedirector,
        'errorHandler': useHandlesErrors,
        'fetchUser': useFetchUser,
        'authState': useAuthState,
        'authRedirector': useAuthRedirector,
      }
    }
  }
} as PluginOptions)

app.mount('#app')
