import Requester from './Requester'
import UseAuthState from './UseAuthState'

export default interface PluginOptions {
  requester?: Requester
  useAuthState?: UseAuthState
}
