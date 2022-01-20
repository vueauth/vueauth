import Requester from './MakeRequester'
import UseAuthState from './UseAuthState'

export default interface SanctumConfig {
  makeRequester: Requester
  useAuthState: UseAuthState
}
