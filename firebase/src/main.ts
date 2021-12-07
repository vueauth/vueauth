export { FirebasePlugin } from './firebasePlugin'
export { useApp } from './useApp'

export { useIdentityPasswordLogout } from './Implementations/useIdentityPasswordLogout'
export { usePasswordResetViaEmail } from './Implementations/usePasswordResetViaEmail'
export { useAuthState } from './Implementations/useAuthState'
export { useIdentityPasswordRegister } from './Implementations/useIdentityPasswordRegister'
export { useIdentityPasswordLogin } from './Implementations/useIdentityPasswordLogin'
export { useFetchUser } from './Implementations/useFetchUser'

export { useFirebaseAuthProvider } from './Implementations/authProviders/useFirebaseAuthProvider'
export { useFirebaseFacebookAuth } from './Implementations/authProviders/useFirebaseFacebookAuth'
export { useFirebaseGithubAuth } from './Implementations/authProviders/useFirebaseGithubAuth'
export { useFirebaseGoogleAuth } from './Implementations/authProviders/useFirebaseGoogleAuth'
export { useFirebaseTwitterAuth } from './Implementations/authProviders/useFirebaseTwitterAuth'

export { useHandlesErrors } from './Implementations/useHandlesErrors'

export { useAuthenticatedRedirector } from './Implementations/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './Implementations/useUnauthenticatedRedirector'
export { useAuthRedirector } from './Implementations/useAuthRedirector'

export { useFirestore } from './firestore/useFirestore'
export { getFirestore } from './firestore/getFirestore'
