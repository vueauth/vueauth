import { useVueUseAuthState } from './implementations/useVueUseAuthState'
import { PluginOptions } from './types/PluginOptions'
import { makeFetchRequester } from './implementations/makeFetchRequester'

export default (): PluginOptions => {
  return {
    makeRequester: makeFetchRequester,
    useAuthState: useVueUseAuthState,
    baseUrl: undefined,
    endpoints: {
      login: '/login',
      register: '/register',
      logout: '/logout',
      getUser: 'api/user',
      csrfCookie: '/sanctum/csrf-cookie',
      resetPassword: '/reset-password',
      forgotPassword: '/forgot-password',
      password: '/user/password',
    },
  }
}
