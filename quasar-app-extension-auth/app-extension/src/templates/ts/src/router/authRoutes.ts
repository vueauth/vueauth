import type { RouteRecordRaw } from 'vue-router'

export const authRoutes: RouteRecordRaw[] = [
  {
    name: 'auth.register',
    path: '/register',
    meta: { unauthOnly: true },
    component: () => import('pages/auth/register/RegisterPage.vue'),
  },
  {
    name: 'auth.login',
    path: '/login',
    meta: { unauthOnly: true },
    component: () => import('pages/auth/login/LoginPage.vue'),
  },
  {
    name: 'auth.requestPasswordReset',
    path: '/forgot-password',
    meta: { unauthOnly: true },
    component: () => import('pages/auth/password-reset/PasswordResetRequestPage.vue'),
  },
  {
    name: 'auth.resetPassword',
    path: '/password-reset',
    meta: { unauthOnly: true },
    component: () => import('pages/auth/password-reset/PasswordResetPage.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('layouts/AuthLayout/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/dashboard/DashboardPage.vue'),
        meta: { authOnly: true },
      },
    ],
  },
]
