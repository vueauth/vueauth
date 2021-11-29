import { UseIdentityPasswordRegister } from '../Contracts/UseIdentityPasswordRegister'
import { UseIdentityPasswordLogin } from '../Contracts/UseIdentityPasswordLogin'
import { UseIdentityPasswordLogout } from '../Contracts/UseIdentityPasswordLogout'
import { UseFetchUser } from '../Contracts/UseFetchUser'
import { UseAuthState } from '../Contracts/UseAuthState'
import { UseAuthenticatedRedirector } from '../Contracts/UseAuthenticatedRedirector'
import { UseUnauthenticatedRedirector } from '../Contracts/UseUnauthenticatedRedirector'
import { UseHandlesErrors } from '../Contracts/UseHandlesErrors'
import { UseAuthRedirector } from 'src/types'

export type Feature = UseIdentityPasswordRegister |
  UseIdentityPasswordLogin |
  UseIdentityPasswordLogout |
  UseUnauthenticatedRedirector |
  UseAuthenticatedRedirector |
  UseHandlesErrors |
  UseFetchUser |
  UseAuthState |
  UseAuthRedirector

export interface FeaturesOptions {
  'identityPassword:register'?: UseIdentityPasswordRegister
  'identityPassword:login'?: UseIdentityPasswordLogin
  'identityPassword:logout'?: UseIdentityPasswordLogout
  'unauthenticatedRedirector'?: UseUnauthenticatedRedirector
  'authenticatedRedirector'?: UseAuthenticatedRedirector
  'errorHandler'?: UseHandlesErrors
  'fetchUser'?: UseFetchUser
  'authState'?: UseAuthState
  'authRedirector'?: UseAuthRedirector
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
