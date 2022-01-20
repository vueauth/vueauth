import { MakeRequester } from './MakeRequester'
import UseAuthState from './UseAuthState'

export interface SanctumEndpoints {
  login: string
  register: string
  logout: string
  getUser: string
  csrfCookie: string
  resetPassword: string
  forgotPassword: string
  password: string
}

export interface SanctumOptionsEndpoints {
  login?: string
  register?: string
  logout?: string
  getUser?: string
  csrfCookie?: string
  resetPassword?: string
  forgotPassword?: string
  password?: string
}

export interface SanctumConfig {
  makeRequester: MakeRequester
  useAuthState: UseAuthState
  baseUrl: string
  endpoints: SanctumEndpoints
}

export interface PluginOptions {
  baseUrl?: string
  makeRequester?: MakeRequester
  useAuthState?: UseAuthState
  endpoints?: SanctumEndpoints
}

export default PluginOptions
