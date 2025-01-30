import { useVueUseAuthState } from './implementations/useVueUseAuthState'
import { PluginOptions } from './types/PluginOptions'
import { makeFetchRequester } from './implementations/makeFetchRequester'
import useLocalStorageTokenRepo from './implementations/useLocalStorageTokenRepo'

export default (): PluginOptions => {
  return {
    makeRequester: makeFetchRequester,
    useAuthState: useVueUseAuthState,
    useTokenRepo: useLocalStorageTokenRepo,
    baseUrl: undefined,
    endpoints: {
      login: "api/auth/local",
      register: "api/auth/local/register",
      getUser: "api/users/me",
      resetPassword: "api/auth/reset-password",
      forgotPassword: "api/auth/forgot-password",
      changePassword: "api/auth/change-password",
    },
  };
}
