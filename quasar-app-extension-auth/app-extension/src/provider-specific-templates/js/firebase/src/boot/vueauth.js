import { boot } from 'quasar/wrappers'
import { AuthPlugin } from '@vueauth/core'

import {
  FirebasePlugin,
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
} from '@vueauth/firebase'

export default boot(({ app }) => {
  app.use(FirebasePlugin, {
    apiKey: 'XXXXXXXXXXXXXX-XXXXXXXXXXX',
    authDomain: 'XXXXXXXX-firebase.firebaseapp.com',
    projectId: 'XXXXXXXXX-firebase',
    storageBucket: 'XXXXXXXXX-firebase.appspot.com',
    messagingSenderId: 'XXXXXXXXXXXXXXX',
    appId: 'X:XXXXXXXXXX:web:XXXXXXXXXXXXXXXXX',
    measurementId: 'X-XXXXXXXXXXXX'
  })

  app.use(AuthPlugin, {
    default: 'firebase',
    providers: {
      firebase: {
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
