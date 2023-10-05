import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import StartPage from '../views/StartPage.vue'
import TeacherCabinet from "@/components/Teacher/TeacherCabinet.vue";
import StudentCabinet from "@/components/Student/StudentCabinet.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/start'
  },
  {
    path: '/start',
    name: 'Start',
    component: StartPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUpPage.vue')
  },
  {
    path: '/teacher-room',
    name: 'TeacherCabinet',
    component: TeacherCabinet
  },
  {
    path: '/student-room',
    name: 'StudentCabinet',
    component: StudentCabinet
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
