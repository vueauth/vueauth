import { useAuthProvider } from './useAuthProvider'

export const useFacebookAuth = () => {
  const facebookAuthProvider = useAuthProvider('facebook')

  return {
    ...facebookAuthProvider
  }
}

export default useFacebookAuth
