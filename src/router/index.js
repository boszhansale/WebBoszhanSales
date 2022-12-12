import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomeView.vue'
import Auth from '../views/AuthView.vue'
import NotFound from '../views/NotFoundView.vue'

const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
