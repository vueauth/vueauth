import EmailPasswordRegisterPage from '../pages/EmailPasswordRegisterPage.vue'
import EmailPasswordSignInPage from '../pages/EmailPasswordSignInPage.vue'
import PasswordResetPage from '../pages/PasswordResetPage.vue'
// import LogoutPage from '../pages/LogoutPage.vue'
import RedirectIfAuthenticated from '../pages/RedirectIfAuthenticated.vue'
import RedirectIfUnauthenticated from '../pages/RedirectIfUnauthenticated.vue'
// import AuthState from '../pages/AuthState.vue'

export default [
  {
    path: '/email-password-register',
    label: 'Email password register',
    component: EmailPasswordRegisterPage
  },
  {
    path: '/email-password-sign-in',
    label: 'Email password sign in',
    component: EmailPasswordSignInPage
  },
  // {
  //   path: '/logout',
  //   label: 'Logout',
  //   component: LogoutPage
  // },
  {
    path: '/redirect-if-authenticated',
    label: 'Redirect if authenticated',
    component: RedirectIfAuthenticated
  },
  {
    path: '/redirect-if-unauthenticated',
    label: 'Redirect if unauthenticated',
    component: RedirectIfUnauthenticated
  },
  {
    path: '/password-reset',
    label: 'Password Reset',
    component: PasswordResetPage
  },
  // {
  //   path: '/auth-state',
  //   label: 'Auth State',
  //   component: AuthState
  // }
]
