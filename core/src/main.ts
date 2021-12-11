/**
 * Plugin
 */
export { AuthPlugin, PluginOptions } from './authPlugin'

/**
 * Email/Password Injectors
 */
export { useIdentityPasswordLogin } from './Injectors/useIdentityPasswordLogin'
export { useIdentityPasswordLogout } from './Injectors/useIdentityPasswordLogout'
export { useIdentityPasswordRegister } from './Injectors/useIdentityPasswordRegister'
export { usePasswordResetViaEmail } from './Injectors/usePasswordResetViaEmail'

/**
 * Redirect Injectors
 */
export { useAuthRedirector } from './Injectors/useAuthRedirector'
export { useAuthenticatedRedirector } from './Injectors/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './Injectors/useUnauthenticatedRedirector'

/**
 * Additional Injectors
 */
export { getDefaultProvider } from './Injectors/getDefaultProvider'
export { useAuthState } from './Injectors/useAuthState'
export { useFeature } from './Injectors/useFeature'
export { useFetchUser } from './Injectors/useFetchUser'
export { useHandlesErrors } from './Injectors/useHandlesErrors'
export { getOptions } from './Injectors/getOptions'
export { useUpdatePassword } from './Injectors/useUpdatePassword'

/**
 * Contracts
 */
export { UseIdentityPasswordRegister, UseIdentityPasswordRegisterReturn, IdentityPasswordRegisterOptions } from './Contracts/UseIdentityPasswordRegister'
export { UseIdentityPasswordLogin, UseIdentityPasswordLoginReturn } from './Contracts/UseIdentityPasswordLogin'
export { UseIdentityPasswordLogout, UseIdentityPasswordLogoutReturn } from './Contracts/UseIdentityPasswordLogout'
export { UsePasswordResetViaEmail, UsePasswordResetViaEmailReturn } from './Contracts/UsePasswordResetViaEmail'
export { UseUpdatePassword, UseUpdatePasswordReturn } from './Contracts/UseUpdatePassword'
export { UseUnauthenticatedRedirector, UseUnauthenticatedRedirectorReturn } from './Contracts/UseUnauthenticatedRedirector'
export { UseAuthenticatedRedirector, UseAuthenticatedRedirectorReturn } from './Contracts/UseAuthenticatedRedirector'
export { UseHandlesErrors, UseHandlesErrorsReturn } from './Contracts/UseHandlesErrors'
export { UseFetchUser, UseFetchUserReturn } from './Contracts/UseFetchUser'
export { UseAuthState } from './Contracts/UseAuthState'
export { UseAuthRedirector, UseAuthRedirectorReturn, RedirectTriggers } from './Contracts/UseAuthRedirector'

/**
 * Supporting Types
 */
export { AuthState } from './Types/AuthState'
export { User } from './Types/User'
export { ValidationErrors } from './Types/ValidationErrors'
