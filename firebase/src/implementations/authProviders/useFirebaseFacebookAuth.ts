import { FacebookAuthProvider } from 'firebase/auth'
import useFirebaseAuthProvider from './useFirebaseAuthProvider'

export const useFirebaseFacebookAuth = () => {
  const facebookAuthProvider = useFirebaseAuthProvider(new FacebookAuthProvider())

  return {
    ...facebookAuthProvider,
  }
}

export default useFirebaseFacebookAuth
