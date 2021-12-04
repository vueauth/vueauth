import { TwitterAuthProvider } from 'firebase/auth'
import useFirebaseAuthProvider from './useFirebaseAuthProvider'

export const useFirebaseTwitterAuth = () => {
  const twitterAuthProvider = useFirebaseAuthProvider(new TwitterAuthProvider())

  return {
    ...twitterAuthProvider
  }
}

export default useFirebaseTwitterAuth
