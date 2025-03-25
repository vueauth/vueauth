import { boot } from 'quasar/wrappers'
import { AuthPlugin } from '@vueauth/core'

import {
  IndexedDbPlugin,
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
  useUpdatePassword,
} from '@vueauth/indexeddb'

export default boot(({ app }) => {
  app.use<PluginOptions>(IndexedDbPlugin, {
    makeUserId: () => crypto.randomUUID(),

    dbOptions: {
      /**
       * Database name used to store users. If using vuemodel,
       * follow the format `{driverKey}:{usersTableName}`
       */
      dbName: 'local:users',

      /**
       * Database store used to store users. If using vuemodel with indexeddb,
       * follow the format `{driverKey}:{usersTableName}`, and make
       * this value identical to the option `dbName`
       */
      storeName: 'local:users',

      /**
       * This driver is used to testing, so it may makes sense to introduce
       * a mock latency when working with loading state. Try setting
       * it temporarily to a number like `500` while testing.
       */
      mockLatencyMs: 200,
    },
  })

  app.use(AuthPlugin, {
    default: 'indexeddb',
    providers: {
      indexeddb: {
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
          'updatePassword': useUpdatePassword,
        },
      },
    },
  })
})
