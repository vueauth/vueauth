import { AuthDbOptions } from 'src/db/AuthDb'
import UseAuthState from './UseAuthState'

export interface IndexedDbConfig {
  useAuthState: UseAuthState
  makeUserId?: () => string
}

export interface PluginOptions {
  useAuthState: UseAuthState
  makeUserId?: () => string
  dbOptions?: AuthDbOptions
}

export default PluginOptions
