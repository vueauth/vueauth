import { MakeRequester } from './MakeRequester'
import UseAuthState from './UseAuthState'
import { UseTokenRepo } from './UseTokenRepo'

export interface StrapiEndpoints {
  login: string
  register: string
  getUser: string
  resetPassword: string
  forgotPassword: string
  changePassword: string
}

export interface StrapiOptionsEndpoints {
  login?: string
  register?: string
  getUser?: string
  csrfCookie?: string
  resetPassword?: string
  forgotPassword?: string
  password?: string
}

export interface StrapiConfig {
  makeRequester: MakeRequester
  useAuthState: UseAuthState
  useTokenRepo: UseTokenRepo
  baseUrl: string
  endpoints: StrapiEndpoints
}

export interface PluginOptions {
  baseUrl?: string
  makeRequester?: MakeRequester
  useAuthState?: UseAuthState
  useTokenRepo?: UseTokenRepo
  endpoints?: StrapiEndpoints
}

export default PluginOptions
