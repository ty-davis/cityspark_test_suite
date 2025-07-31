import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/my-event-calendar',
      name: 'portal',
      component: () => import('../views/Portal.vue'),
    },
    {
      path: '/widget',
      name: 'widget',
      component: () => import('../views/Widget.vue'),
    },
    {
      path: '/collection',
      name: 'collection',
      component: () => import('../views/Collection.vue'),
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/Settings.vue')
    },
  ],
})

export default router
