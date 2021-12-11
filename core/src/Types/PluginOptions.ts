import { IdentityPasswordRegisterOptions, UseIdentityPasswordRegister } from '../Contracts/UseIdentityPasswordRegister'
import { UseIdentityPasswordLogin } from '../Contracts/UseIdentityPasswordLogin'
import { UseIdentityPasswordLogout } from '../Contracts/UseIdentityPasswordLogout'
import { UseFetchUser } from '../Contracts/UseFetchUser'
import { UseAuthState } from '../Contracts/UseAuthState'
import { UseAuthenticatedRedirector } from '../Contracts/UseAuthenticatedRedirector'
import { UseUnauthenticatedRedirector } from '../Contracts/UseUnauthenticatedRedirector'
import { UseHandlesErrors } from '../Contracts/UseHandlesErrors'
import { UseAuthRedirector } from '../types'
import { UsePasswordResetViaEmail, UseUpdatePassword } from '../main'

export type Feature = UseIdentityPasswordRegister |
  UseIdentityPasswordLogin |
  UseIdentityPasswordLogout |
  UseUnauthenticatedRedirector |
  UseAuthenticatedRedirector |
  UseHandlesErrors |
  UseFetchUser |
  UseAuthState |
  UseAuthRedirector |
  UsePasswordResetViaEmail |
  UseUpdatePassword

interface UseIdentityPasswordRegisterConfig {
  provider: UseIdentityPasswordRegister
  options: IdentityPasswordRegisterOptions
}

export interface FeaturesOptions {
  'identityPassword:register'?: UseIdentityPasswordRegister | UseIdentityPasswordRegisterConfig
  'identityPassword:login'?: UseIdentityPasswordLogin
  'identityPassword:logout'?: UseIdentityPasswordLogout
  'passwordResetViaEmail'?: UsePasswordResetViaEmail
  'unauthenticatedRedirector'?: UseUnauthenticatedRedirector
  'authenticatedRedirector'?: UseAuthenticatedRedirector
  'errorHandler'?: UseHandlesErrors
  'fetchUser'?: UseFetchUser
  'authState'?: UseAuthState
  'authRedirector'?: UseAuthRedirector
  'updatePassword'?: UseUpdatePassword
}

export interface Provider {
  features: FeaturesOptions
}

export interface Providers {
  [key: string]: Provider
}

export interface PluginOptions {
  default: string
  providers: Providers
}
