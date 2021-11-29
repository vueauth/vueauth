export { useIdentityPasswordLogin } from './Injectors/useIdentityPasswordLogin'
export { useIdentityPasswordLogout } from './Injectors/useIdentityPasswordLogout'
export { useIdentityPasswordRegister } from './Injectors/useIdentityPasswordRegister'

export { getDefaultProvider } from './Injectors/getDefaultProvider'

export { useAuthRedirector } from './Injectors/useAuthRedirector'
export { useAuthenticatedRedirector } from './Injectors/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './Injectors/useUnauthenticatedRedirector'

export { useAuthState } from './Injectors/useAuthState'
export { useFeature } from './Injectors/useFeature'
export { useFetchUser } from './Injectors/useFetchUser'
export { useHandlesErrors } from './Injectors/useHandlesErrors'

export { VuePlugin, PluginOptions } from './vuePlugin'

// Types
export { UseIdentityPasswordRegister, UseIdentityPasswordRegisterReturn } from './Contracts/UseIdentityPasswordRegister'
export { UseIdentityPasswordLogin, UseIdentityPasswordLoginReturn } from './Contracts/UseIdentityPasswordLogin'
export { UseIdentityPasswordLogout, UseIdentityPasswordLogoutReturn } from './Contracts/UseIdentityPasswordLogout'
export { UseUnauthenticatedRedirector, UseUnauthenticatedRedirectorReturn } from './Contracts/UseUnauthenticatedRedirector'
export { UseAuthenticatedRedirector, UseAuthenticatedRedirectorReturn } from './Contracts/UseAuthenticatedRedirector'
export { UseHandlesErrors, UseHandlesErrorsReturn } from './Contracts/UseHandlesErrors'
export { UseFetchUser, UseFetchUserReturn } from './Contracts/UseFetchUser'
export { UseAuthState } from './Contracts/UseAuthState'
export { AuthState } from './Types/AuthState'
export { UseAuthRedirector, UseAuthRedirectorReturn, RedirectTriggers } from './Contracts/UseAuthRedirector'
export { ValidationErrors, ValidationError } from './Types/ValidationErrors'
