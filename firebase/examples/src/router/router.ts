import { createRouter, createWebHashHistory } from 'vue-router'
import BlankLayout from '../layout/BlankLayout.vue'
import HomePage from '../pages/HomePage.vue'
import exampleRoutes from './example-routes'

const routes = [
  {
    path: '/',
    component: BlankLayout,
    children: [
      {
        path: '',
        component: HomePage
      },
      ...exampleRoutes
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
