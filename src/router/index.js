import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favoritos from '../views/Favoritos.vue'

const routes = [
  
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: Favoritos
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
