import { useAuthProvider } from './useAuthProvider'

export const useGithubAuth = () => {
  const githubAuthProvider = useAuthProvider('github')

  return {
    ...githubAuthProvider,
  }
}

export default useGithubAuth
