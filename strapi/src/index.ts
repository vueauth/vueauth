// Plugin
export { StrapiPlugin } from './StrapiPlugin'

// Strapi Implementations
export { makeFetchRequester } from './implementations/makeFetchRequester'
export { useLocalStorageTokenRepo } from './implementations/useLocalStorageTokenRepo'

// Implementations
export { useIdentityPasswordLogin } from './implementations/useIdentityPasswordLogin'
export { useIdentityPasswordRegister } from './implementations/useIdentityPasswordRegister'
export { usePasswordResetViaEmail } from './implementations/usePasswordResetViaEmail'
export { useAuthState } from './implementations/useAuthState'
export { useIdentityPasswordLogout } from './implementations/useIdentityPasswordLogout'
export { useFetchUser } from './implementations/useFetchUser'
export { useUpdatePassword } from './implementations/useUpdatePassword'

export { getStrapiConfig } from './getStrapiConfig'

export { useAuthRedirector } from './implementations/useAuthRedirector'
export { useAuthenticatedRedirector } from './implementations/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './implementations/useUnauthenticatedRedirector'
export { useHandlesErrors } from './implementations/useHandlesErrors'

export { useVueUseAuthState } from './implementations/useVueUseAuthState'

export {
  type StrapiEndpoints,
  type StrapiOptionsEndpoints,
  type StrapiConfig,
  type PluginOptions,
} from './types/PluginOptions'
