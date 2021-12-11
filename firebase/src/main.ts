export { FirebasePlugin } from './firebasePlugin'
export { useApp } from './useApp'

export { useIdentityPasswordLogout } from './implementations/useIdentityPasswordLogout'
export { usePasswordResetViaEmail } from './implementations/usePasswordResetViaEmail'
export { useAuthState } from './implementations/useAuthState'
export { useIdentityPasswordRegister } from './implementations/useIdentityPasswordRegister'
export { useIdentityPasswordLogin } from './implementations/useIdentityPasswordLogin'
export { useFetchUser } from './implementations/useFetchUser'
export { useUpdatePassword } from './implementations/useUpdatePassword'

export { useFirebaseAuthProvider } from './implementations/authProviders/useFirebaseAuthProvider'
export { useFirebaseFacebookAuth } from './implementations/authProviders/useFirebaseFacebookAuth'
export { useFirebaseGithubAuth } from './implementations/authProviders/useFirebaseGithubAuth'
export { useFirebaseGoogleAuth } from './implementations/authProviders/useFirebaseGoogleAuth'
export { useFirebaseTwitterAuth } from './implementations/authProviders/useFirebaseTwitterAuth'

export { useHandlesErrors } from './implementations/useHandlesErrors'

export { useAuthenticatedRedirector } from './implementations/useAuthenticatedRedirector'
export { useUnauthenticatedRedirector } from './implementations/useUnauthenticatedRedirector'
export { useAuthRedirector } from './implementations/useAuthRedirector'

export { useFirestore } from './firestore/useFirestore'
export { getFirestore } from './firestore/getFirestore'
