import EmailPasswordRegisterPage from '../pages/EmailPasswordRegisterPage.vue'
import EmailPasswordLoginPage from '../pages/EmailPasswordLoginPage.vue'
import LogoutPage from '../pages/LogoutPage.vue'
import RedirectIfAuthenticated from '../pages/RedirectIfAuthenticated.vue'
import RedirectIfUnauthenticated from '../pages/RedirectIfUnauthenticated.vue'
import AuthState from '../pages/AuthState.vue'
import PasswordResetPage from '../pages/PasswordResetPage.vue'

export default [
  {
    path: '/email-password-register',
    name: 'emailPasswordRegister',
    label: 'Email password register',
    component: EmailPasswordRegisterPage
  },
  {
    path: '/email-password-login',
    name: 'emailPasswordLogin',
    label: 'Email password login',
    component: EmailPasswordLoginPage
  },
  {
    path: '/logout',
    label: 'Logout',
    name: 'logout',
    component: LogoutPage
  },
  {
    path: '/redirect-if-authenticated',
    label: 'Redirect if authenticated',
    name: 'redirectIfAuthenticated',
    component: RedirectIfAuthenticated
  },
  {
    path: '/redirect-if-unauthenticated',
    label: 'Redirect if unauthenticated',
    name: 'redirectIfUnauthenticated',
    component: RedirectIfUnauthenticated
  },
  {
    path: '/auth-state',
    label: 'Auth State',
    name: 'authState',
    component: AuthState
  },
  {
    path: '/password-reset',
    label: 'Password Reset',
    name: 'passwordReset',
    component: PasswordResetPage
  }
]
