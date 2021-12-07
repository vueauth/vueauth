import { useAuthProvider } from './useAuthProvider'

export const useGoogleAuth = () => {
  const googleAuthProvider = useAuthProvider('google')

  return {
    ...googleAuthProvider
  }
}

export default useGoogleAuth
