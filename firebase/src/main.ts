// Plugin
// Social Auth Providers
export { useFirebaseAuthProvider } from './authProviders/useFirebaseAuthProvider'
export { useFirebaseFacebookAuth } from './authProviders/useFirebaseFacebookAuth'
export { useFirebaseGithubAuth } from './authProviders/useFirebaseGithubAuth'
export { useFirebaseGoogleAuth } from './authProviders/useFirebaseGoogleAuth'
export { useFirebaseTwitterAuth } from './authProviders/useFirebaseTwitterAuth'

export { FirebasePlugin } from './firebasePlugin'
export { useApp } from './useApp'

// Auth
export { useIdentityPasswordLogout } from './useIdentityPasswordLogout'
export { useAuthState } from './useAuthState'
export { useIdentityPasswordRegister } from './useIdentityPasswordRegister'
export { useIdentityPasswordLogin } from './useIdentityPasswordLogin'
export { useFetchUser } from './useFetchUser'

// Utilities
export { useHandlesErrors } from './useHandlesErrors'
export { useAuthenticatedRedirector } from './utils/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './utils/useUnauthenticatedRedirector'
export { useAuthRedirector } from './utils/useAuthRedirector'

// Firestore
export { useFirestore } from './firestore/useFirestore'
export { getFirestore } from './firestore/getFirestore'
