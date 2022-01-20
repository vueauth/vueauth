import { UseIdentityPasswordRegister, UseIdentityPasswordRegisterBaseConfig } from '../contracts/UseIdentityPasswordRegister'
import { UseIdentityPasswordLogin, UseIdentityPasswordLoginBaseConfig } from '../contracts/UseIdentityPasswordLogin'
import { UseIdentityPasswordLogout, UseIdentityPasswordLogoutBaseConfig } from '../contracts/UseIdentityPasswordLogout'
import { UseFetchUser, UseFetchUserBaseConfig } from '../contracts/UseFetchUser'
import { UseAuthState, UseAuthStateBaseConfig } from '../contracts/UseAuthState'
import { UseAuthenticatedRedirector, UseAuthenticatedRedirectorBaseConfig } from '../contracts/UseAuthenticatedRedirector'
import { UseUnauthenticatedRedirector, UseUnauthenticatedRedirectorBaseConfig } from '../contracts/UseUnauthenticatedRedirector'
import { UseHandlesErrors, UseHandlesErrorsBaseConfig } from '../contracts/UseHandlesErrors'
import { UseAuthRedirector, UseAuthRedirectorBaseConfig } from '../contracts/UseAuthRedirector'
import { UsePasswordResetViaEmail, UsePasswordResetViaEmailBaseConfig } from '../contracts/UsePasswordResetViaEmail'
import { UseUpdatePassword, UseUpdatePasswordBaseConfig } from '../contracts/UseUpdatePassword'
import { MaybeRef } from '@vueuse/core'

export type Feature = (UseIdentityPasswordRegister | UseIdentityPasswordRegisterBaseConfig) |
  (UseIdentityPasswordLogin | UseIdentityPasswordLoginBaseConfig) |
  (UseIdentityPasswordLogout | UseIdentityPasswordLogoutBaseConfig) |
  (UseUnauthenticatedRedirector | UseUnauthenticatedRedirectorBaseConfig) |
  (UseAuthenticatedRedirector | UseAuthenticatedRedirectorBaseConfig) |
  (UseHandlesErrors | UseHandlesErrorsBaseConfig) |
  (UseFetchUser | UseFetchUserBaseConfig) |
  (UseAuthState | UseAuthStateBaseConfig) |
  (UseAuthRedirector | UseAuthRedirectorBaseConfig) |
  (UsePasswordResetViaEmail | UsePasswordResetViaEmailBaseConfig) |
  (UseUpdatePassword | UseUpdatePasswordBaseConfig)

export interface FeaturesConfigs {
  'identityPassword:register'?: UseIdentityPasswordRegister | UseIdentityPasswordRegisterBaseConfig
  'identityPassword:login'?: UseIdentityPasswordLogin | UseIdentityPasswordLoginBaseConfig
  'identityPassword:logout'?: UseIdentityPasswordLogout | UseIdentityPasswordLogoutBaseConfig
  'passwordResetViaEmail'?: UsePasswordResetViaEmail | UsePasswordResetViaEmailBaseConfig
  'unauthenticatedRedirector'?: UseUnauthenticatedRedirector | UseUnauthenticatedRedirectorBaseConfig
  'authenticatedRedirector'?: UseAuthenticatedRedirector | UseAuthenticatedRedirectorBaseConfig
  'errorHandler'?: UseHandlesErrors | UseHandlesErrorsBaseConfig
  'fetchUser'?: UseFetchUser | UseFetchUserBaseConfig
  'authState'?: UseAuthState | UseAuthStateBaseConfig
  'authRedirector'?: UseAuthRedirector | UseAuthRedirectorBaseConfig
  'updatePassword'?: UseUpdatePassword | UseUpdatePasswordBaseConfig
}

export interface Provider {
  features: FeaturesConfigs
}

export interface Providers {
  [key: string]: Provider
}

export interface PluginOptions {
  default: MaybeRef<string>
  providers: Providers
}
