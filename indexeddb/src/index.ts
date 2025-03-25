// Plugin
export { IndexedDbPlugin } from './plugin/IndexedDbPlugin'
export { state } from './plugin/state'

// IndexedDb Implementations

// Implementations
export { useIdentityPasswordLogin } from './implementations/useIdentityPasswordLogin'
export { useIdentityPasswordRegister } from './implementations/useIdentityPasswordRegister'
export { usePasswordResetViaEmail } from './implementations/usePasswordResetViaEmail'
export { useAuthState } from './implementations/useAuthState'
export { useIdentityPasswordLogout } from './implementations/useIdentityPasswordLogout'
export { useFetchUser } from './implementations/useFetchUser'
export { useUpdatePassword } from './implementations/useUpdatePassword'
export { useHandlesErrors } from './implementations/useHandlesErrors'

export { useAuthRedirector } from './implementations/useAuthRedirector'
export { useAuthenticatedRedirector } from './implementations/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './implementations/useUnauthenticatedRedirector'

export { type PluginOptions } from './types/PluginOptions'
// export { useVueUseAuthState } from './implementations/useVueUseAuthState'
