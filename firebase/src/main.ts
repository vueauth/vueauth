// Plugin
export { firebasePlugin } from './firebase/firebasePlugin'
export { useApp } from './firebase/useApp'

// Social Auth Providers
import useFirebaseAuthProvider from './firebase/authProviders/useFirebaseAuthProvider'
import useFirebaseFacebookAuth from './firebase/authProviders/useFirebaseFacebookAuth'
import useFirebaseGithubAuth from './firebase/authProviders/useFirebaseGithubAuth'
import useFirebaseGoogleAuth from './firebase/authProviders/useFirebaseGoogleAuth'
import useFirebaseTwitterAuth from './firebase/authProviders/useFirebaseTwitterAuth'

// Auth
export { useIdentityPasswordLogout } from './firebase/useIdentityPasswordLogout'
export { useAuthState } from './firebase/useAuthState'
export { useIdentityPasswordRegister } from './firebase/useIdentityPasswordRegister'
export { useIdentityPasswordLogin } from './firebase/useIdentityPasswordLogin'
export { useFetchUser } from './firebase/useFetchUser'

// Utilities
export { useHandlesErrors } from './useHandlesErrors'
export { useAuthenticatedRedirector } from './firebase/utils/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './firebase/utils/useUnauthenticatedRedirector'
export { useAuthRedirector } from './firebase/utils/useAuthRedirector'

// Firestore
export { useFirestore } from './firebase/firestore/useFirestore'
export { getFirestore } from './firebase/firestore/getFirestore'

export {
  useFirebaseAuthProvider,
  useFirebaseFacebookAuth,
  useFirebaseGithubAuth,
  useFirebaseGoogleAuth,
  useFirebaseTwitterAuth,
}
