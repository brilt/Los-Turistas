import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Favoritos from '../views/Favoritos.vue'
import SignUp from "../views/SignUp.vue";
import Login from "../views/Login.vue";
import Secret from "../views/Secret.vue";


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
  },
  {
    path: "/sign-up",
    name: "sign-up",
    component: SignUp
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/secret",
    name: "secret",
    component: Secret
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
