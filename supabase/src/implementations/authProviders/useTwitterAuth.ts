import { useAuthProvider } from './useAuthProvider'

export const useTwitterAuth = () => {
  const twitterAuthProvider = useAuthProvider('twitter')

  return {
    ...twitterAuthProvider
  }
}

export default useTwitterAuth
