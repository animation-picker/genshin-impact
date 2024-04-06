import { createRouter, createWebHistory } from 'vue-router'
import AppView from '../views/AppView.vue'
import ScreenView from '../views/ScreenView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'app',
      component: AppView
    },
    {
      path: '/screen',
      name: 'screen',
      component: ScreenView
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
