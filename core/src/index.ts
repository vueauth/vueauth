/**
 * Plugin
 */
export { AuthPlugin, type PluginOptions } from './authPlugin'
export { useFeature, type UseFeatureConfig } from './injectors/useFeature'

/**
 * Email/Password Injectors
 */
export { useIdentityPasswordLogin } from './injectors/useIdentityPasswordLogin'
export { useIdentityPasswordLogout } from './injectors/useIdentityPasswordLogout'
export { useIdentityPasswordRegister } from './injectors/useIdentityPasswordRegister'
export { usePasswordResetViaEmail } from './injectors/usePasswordResetViaEmail'

/**
 * Redirect Injectors
 */
export { useAuthRedirector } from './injectors/useAuthRedirector'
export { useAuthenticatedRedirector } from './injectors/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './injectors/useUnauthenticatedRedirector'

/**
 * Additional Injectors
 */
export { getDefaultProvider } from './injectors/getDefaultProvider'
export { useAuthState } from './injectors/useAuthState'
export { useFetchUser } from './injectors/useFetchUser'
export { useHandlesErrors } from './injectors/useHandlesErrors'
export { getConfig } from './injectors/getConfig'
export { useUpdatePassword } from './injectors/useUpdatePassword'

/**
 * Contracts
 */
export { type UseIdentityPasswordRegister, type UseIdentityPasswordRegisterReturn, type UseIdentityPasswordRegisterConfig } from './contracts/UseIdentityPasswordRegister'
export { type UseIdentityPasswordLogin, type UseIdentityPasswordLoginReturn } from './contracts/UseIdentityPasswordLogin'
export { type UseIdentityPasswordLogout, type UseIdentityPasswordLogoutReturn } from './contracts/UseIdentityPasswordLogout'
export { type UsePasswordResetViaEmail, type UsePasswordResetViaEmailReturn } from './contracts/UsePasswordResetViaEmail'
export { type UseUpdatePassword, type UseUpdatePasswordReturn } from './contracts/UseUpdatePassword'
export { type UseUnauthenticatedRedirector, type UseUnauthenticatedRedirectorReturn } from './contracts/UseUnauthenticatedRedirector'
export { type UseAuthenticatedRedirector, type UseAuthenticatedRedirectorReturn } from './contracts/UseAuthenticatedRedirector'
export { type UseHandlesErrors, type UseHandlesErrorsReturn } from './contracts/UseHandlesErrors'
export { type UseFetchUser, type UseFetchUserReturn } from './contracts/UseFetchUser'
export { type UseAuthState } from './contracts/UseAuthState'
export { type UseAuthRedirector, type UseAuthRedirectorConfig, type UseAuthRedirectorReturn, type RedirectTriggers } from './contracts/UseAuthRedirector'

/**
 * Utils
 */
export { useHandlesErrors as useHandlesErrorsBase } from './utils/useHandlesErrors'

/**
 * Supporting Types
 */
export { type AuthState } from './types/AuthState'
export { type User } from './types/User'
export { type ValidationErrors } from './types/ValidationErrors'

/**
 * Symbols
 */
export { DefaultAuthProviderSymbol } from './symbols/defaultProviderSymbol'
