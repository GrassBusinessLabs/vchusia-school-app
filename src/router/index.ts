import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import StartPage from '../views/StartPage.vue'
import TeacherCabinet from "@/components/Teacher/TeacherCabinet.vue";
import StudentCabinet from "@/components/Student/StudentCabinet.vue";
import CoursePage from "@/components/Teacher/Course/CoursePage.vue";
import auth from "@/components/layouts/auth.vue";
import main from "@/components/layouts/main.vue";
import AccountTeacher from "@/components/Teacher/AccountTeacher.vue";
import CourseTeacher from "@/components/Teacher/CourseTeacher.vue";
import GroupTeacher from "@/components/Teacher/GroupTeacher.vue";
import PupilsTeacher from "@/components/Teacher/PupilsTeacher.vue";
import TaskTeacher from "@/components/Teacher/TaskTeacher.vue";
import AccountStudent from "@/components/Student/AccountStudent.vue";
import CourseStudent from "@/components/Student/CourseStudent.vue";
import GroupStudent from "@/components/Student/GroupStudent.vue";
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   redirect: '/start'
  // },
  // {
  //   path: '/start',
  //   name: 'Start',
  //   component: StartPage,
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('../views/LoginPage.vue'),
  // },
  // {
  //   path: '/signup',
  //   name: 'SignUp',
  //   component: () => import('../views/SignUpPage.vue')
  // },
  // {
  //   path: '/teacher-room',
  //   name: 'TeacherCabinet',
  //   component: TeacherCabinet,
  // },
  // {
  //   path: '/student-room',
  //   name: 'StudentCabinet',
  //   component: StudentCabinet
  // },
  {
    path: '/course',
    name: 'Course',
    component: CoursePage,

  },
  {
    path: '/auth',
    component: auth,
    name: 'auth',
    children: [

      {
        path: 'start',
        name: 'Start',
        component: StartPage,
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('../views/LoginPage.vue'),
      },
      {
        path: 'signup',
        name: 'SignUp',
        component: () => import('../views/SignUpPage.vue')
      },
    ]
  },


  {
    path: '/main',
    component: main,
    name: 'main',
    children: [
      {
        path: 'account',
        name: 'Account',
        component: AccountTeacher
      },
      {
        path: 'courses',
        name: 'Courses',
        component: CourseTeacher,
      },
      {
        path: 'tasks',
        name: 'Tasks',
        component: TaskTeacher,
      },
      {
        path: 'groups',
        name: 'Groups',
        component: GroupTeacher,
      },
      {
        path: 'course',
        name: 'Course',
        component: CoursePage,

      },
      {
        path: 'student',
        name: 'Student',
        component: AccountStudent
      },
      {
        path: 'course-student',
        name: 'CourseStudent',
        component: CourseStudent
      },
      {
        path: 'groups-student',
        name: 'GroupStudent',
        component: GroupStudent
      }


    ],
  },


]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
