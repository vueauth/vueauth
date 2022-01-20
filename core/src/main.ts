/**
 * Plugin
 */
export { AuthPlugin, PluginOptions } from './authPlugin'
export { useFeature, UseFeatureConfig } from './injectors/useFeature'

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
export { UseIdentityPasswordRegister, UseIdentityPasswordRegisterReturn, UseIdentityPasswordRegisterConfig } from './contracts/UseIdentityPasswordRegister'
export { UseIdentityPasswordLogin, UseIdentityPasswordLoginReturn } from './contracts/UseIdentityPasswordLogin'
export { UseIdentityPasswordLogout, UseIdentityPasswordLogoutReturn } from './contracts/UseIdentityPasswordLogout'
export { UsePasswordResetViaEmail, UsePasswordResetViaEmailReturn } from './contracts/UsePasswordResetViaEmail'
export { UseUpdatePassword, UseUpdatePasswordReturn } from './contracts/UseUpdatePassword'
export { UseUnauthenticatedRedirector, UseUnauthenticatedRedirectorReturn } from './contracts/UseUnauthenticatedRedirector'
export { UseAuthenticatedRedirector, UseAuthenticatedRedirectorReturn } from './contracts/UseAuthenticatedRedirector'
export { UseHandlesErrors, UseHandlesErrorsReturn } from './contracts/UseHandlesErrors'
export { UseFetchUser, UseFetchUserReturn } from './contracts/UseFetchUser'
export { UseAuthState } from './contracts/UseAuthState'
export { UseAuthRedirector, UseAuthRedirectorConfig, UseAuthRedirectorReturn, RedirectTriggers } from './contracts/UseAuthRedirector'

/**
 * Utils
 */
export { useHandlesErrors as useHandlesErrorsBase } from './utils/useHandlesErrors'

/**
 * Supporting Types
 */
export { AuthState } from './types/AuthState'
export { User } from './types/User'
export { ValidationErrors } from './types/ValidationErrors'

/**
 * Symbols
 */
export { DefaultAuthProviderSymbol } from './symbols/defaultProviderSymbol'
