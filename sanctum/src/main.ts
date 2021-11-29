// Plugin
export { sanctumPlugin } from './sanctumPlugin'

// implementations
export { makeFetchRequester } from './implementations/makeFetchRequester'

// Auth
export { useIdentityPasswordLogin } from './implementations/useIdentityPasswordLogin'
export { useIdentityPasswordRegister } from './implementations/useIdentityPasswordRegister'
export { useAuthState } from './implementations/useAuthState'
export { useIdentityPasswordLogout } from './implementations/useLogout'
export { useFetchUser } from './implementations/useFetchUser'

export { getSanctumConfig } from './getSanctumConfig'

export { useAuthRedirector } from './implementations/useAuthRedirector'
export { useAuthenticatedRedirector } from './implementations/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './implementations/useUnauthenticatedRedirector'
export { useHandlesErrors } from './implementations/useHandlesErrors'
