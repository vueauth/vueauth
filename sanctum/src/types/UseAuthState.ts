import { Ref, ComputedRef } from 'vue-demi'
import User from './User'

interface AuthState {
  authIsReady: Ref<boolean>
  isAuthenticated: ComputedRef<boolean>
  user: Ref<User>
}

type UseAuthState = () => AuthState

export default UseAuthState

export {
  AuthState
}
