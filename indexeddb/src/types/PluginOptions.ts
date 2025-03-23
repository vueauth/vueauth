import UseAuthState from './UseAuthState'

export interface IndexedDbConfig {
  useAuthState: UseAuthState
  makeUserId?: () => string
}

export interface PluginOptions {
  key?: string
  useAuthState: UseAuthState
  makeUserId?: () => string
}

export default PluginOptions
