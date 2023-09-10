import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import StartPage from '../views/StartPage.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUp from '../views/SignUpPage.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/start'
  },
  {
    path: '/start',
    name: 'Start',
    component: StartPage
  },
  {
    path: '/start/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/start/signup',
    name: 'SignUp',
    component: SignUp
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
