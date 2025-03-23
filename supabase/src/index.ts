// Plugin
export { SupabasePlugin } from './SupabasePlugin'
export { useClient } from './useClient'

// Auth
export { useIdentityPasswordLogout } from './implementations/useIdentityPasswordLogout'
export { useAuthState } from './implementations/useAuthState'
export { useIdentityPasswordRegister } from './implementations/useIdentityPasswordRegister'
export { useIdentityPasswordLogin } from './implementations/useIdentityPasswordLogin'
export { useFetchUser } from './implementations/useFetchUser'
export { usePasswordResetViaEmail } from './implementations/usePasswordResetViaEmail'
export { useUpdatePassword } from './implementations/useUpdatePassword'

// Utilities
export { useHandlesErrors } from './implementations/useHandlesErrors'
export { useAuthenticatedRedirector } from './implementations/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './implementations/useUnauthenticatedRedirector'
export { useAuthRedirector } from './implementations/useAuthRedirector'
