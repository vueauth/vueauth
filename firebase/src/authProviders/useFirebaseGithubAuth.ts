import { GithubAuthProvider } from 'firebase/auth'
import useFirebaseAuthProvider from './useFirebaseAuthProvider'

export const useFirebaseGithubAuth = () => {
  const githubAuthProvider = useFirebaseAuthProvider(new GithubAuthProvider())

  return {
    ...githubAuthProvider
  }
}

export default useFirebaseGithubAuth