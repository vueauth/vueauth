import { createApp } from 'vue'
import { createGlobalState, useStorage } from '@vueuse/core'
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
  usePasswordResetViaEmail as useSupabasePasswordResetViaEmail
} from '@vueauth/supabase'
import {
  FirebasePlugin,
  useIdentityPasswordLogin as useFirebaseIdentityPasswordLogin,
  useIdentityPasswordLogout as useFirebaseIdentityPasswordLogout,
  useIdentityPasswordRegister as useFirebaseIdentityPasswordRegister,
  useUnauthenticatedRedirector as useFirebaseUnauthenticatedRedirector,
  useAuthRedirector as useFirebaseAuthRedirector,
  useHandlesErrors as useFirebaseHandlesErrors,
  useAuthState as useFirebaseAuthState,
  useAuthenticatedRedirector as useFirebaseAuthenticatedRedirector,
  useFetchUser as useFirebaseFetchUser,
  usePasswordResetViaEmail as useFirebasePasswordResetViaEmail
} from '@vueauth/firebase'
import {
  SanctumPlugin,
  useIdentityPasswordLogin as useSanctumIdentityPasswordLogin,
  useIdentityPasswordLogout as useSanctumIdentityPasswordLogout,
  useIdentityPasswordRegister as useSanctumIdentityPasswordRegister,
  useUnauthenticatedRedirector as useSanctumUnauthenticatedRedirector,
  useAuthRedirector as useSanctumAuthRedirector,
  useHandlesErrors as useSanctumHandlesErrors,
  useAuthState as useSanctumAuthState,
  useAuthenticatedRedirector as useSanctumAuthenticatedRedirector,
  useFetchUser as useSanctumFetchUser,
  usePasswordResetViaEmail as useSanctumPasswordResetViaEmail
} from '@vueauth/sanctum'
import { AuthPlugin, PluginOptions } from '@vueauth/core'
import App from './App.vue'
import router from './router/router'

const app = createApp(App)

const supabaseCredentials = {
  supabaseUrl: 'https://uqzabkzhrgumibxtlgze.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzODY1ODIzOCwiZXhwIjoxOTU0MjM0MjM4fQ.ovHqt7Tt6s8zW_skC8Asa0fYGHrocovyYkXkKUXtGMQ',
}

const firebaseCredentials = {
  apiKey: 'AIzaSyD1R9dykDYOG-5gh7ZnrxnJRSJLRDJd7rE',
  authDomain: 'quasarv2-firebase.firebaseapp.com',
  projectId: 'quasarv2-firebase',
  storageBucket: 'quasarv2-firebase.appspot.com',
  messagingSenderId: '280746308042',
  appId: '1:280746308042:web:3f75f464f40a44c8e0df33',
  measurementId: 'G-YQWS8NXXE4'
}

app.use(router)

app.use(SupabasePlugin, { credentials: supabaseCredentials })
app.use(FirebasePlugin, { credentials: firebaseCredentials })
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

const defaultProviderState = createGlobalState(
  () => useStorage('defaultProvider', 'supabase')
)

const defaultProvider = defaultProviderState()

app.use(AuthPlugin, {
  default: defaultProvider,
  providers: {
    supabase: {
      features: {
        'identityPassword:register': useSupabaseIdentityPasswordRegister,
        'identityPassword:login': useSupabaseIdentityPasswordLogin,
        'identityPassword:logout': useSupabaseIdentityPasswordLogout,
        'unauthenticatedRedirector': useSupabaseUnauthenticatedRedirector,
        'authenticatedRedirector': useSupabaseAuthenticatedRedirector,
        'errorHandler': useSupabaseHandlesErrors,
        'fetchUser': useSupabaseFetchUser,
        'authState': useSupabaseAuthState,
        'authRedirector': useSupabaseAuthRedirector,
        'passwordResetViaEmail': useSupabasePasswordResetViaEmail
      }
    },
    firebase: {
      features: {
        'identityPassword:register': useFirebaseIdentityPasswordRegister,
        'identityPassword:login': useFirebaseIdentityPasswordLogin,
        'identityPassword:logout': useFirebaseIdentityPasswordLogout,
        'unauthenticatedRedirector': useFirebaseUnauthenticatedRedirector,
        'authenticatedRedirector': useFirebaseAuthenticatedRedirector,
        'errorHandler': useFirebaseHandlesErrors,
        'fetchUser': useFirebaseFetchUser,
        'authState': useFirebaseAuthState,
        'authRedirector': useFirebaseAuthRedirector,
        'passwordResetViaEmail': useFirebasePasswordResetViaEmail
      }
    },
    sanctum: {
      features: {
        'identityPassword:register': useSanctumIdentityPasswordRegister,
        'identityPassword:login': useSanctumIdentityPasswordLogin,
        'identityPassword:logout': useSanctumIdentityPasswordLogout,
        'unauthenticatedRedirector': useSanctumUnauthenticatedRedirector,
        'authenticatedRedirector': useSanctumAuthenticatedRedirector,
        'errorHandler': useSanctumHandlesErrors,
        'fetchUser': useSanctumFetchUser,
        'authState': useSanctumAuthState,
        'authRedirector': useSanctumAuthRedirector,
        'passwordResetViaEmail': useSanctumPasswordResetViaEmail
      }
    }
  }
} as PluginOptions)

app.mount('#app')

export {
  defaultProviderState
}