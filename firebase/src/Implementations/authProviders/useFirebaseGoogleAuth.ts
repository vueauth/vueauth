
import { GoogleAuthProvider } from 'firebase/auth'
import useFirebaseAuthProvider from './useFirebaseAuthProvider'

export const useFirebaseGoogleAuth = () => {
  const googleAuthProvider = useFirebaseAuthProvider(new GoogleAuthProvider())

  return {
    ...googleAuthProvider
  }
}

export default useFirebaseGoogleAuth
