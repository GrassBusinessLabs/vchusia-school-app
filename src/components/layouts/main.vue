<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <ion-menu content-id="main-content" class="menu" side="end" ref="menu">
      <ion-header class="ion-no-border">
        <v-toolbar
            dark
            prominent
            mode="ios"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sH6GCGsggznPZO2w47ZcJCqZoujYffx6r-7eRwoxhC-nSviTTIDImt0kKVWf-gPZ1p4&usqp=CAU"
        >

          <v-toolbar-title>Меню</v-toolbar-title>

        </v-toolbar>
      </ion-header>
      <v-card>
        <v-layout>
          <v-navigation-drawer
              class="nav-menu w-100"
              permanent
          >
            <v-divider></v-divider>

            <v-list nav class="list-menu">
              <v-list-item  title="Обліковий запис" value="account" @click="replaceAccount(), this.authStore.activePage='Обліковий запис';" prepend-icon="mdi-account-circle-outline"></v-list-item>
              <v-list-item v-if="this.user.role !== 'STUDENT'" title="Курси" value="course" @click="replaceCourse(), this.authStore.activePage='Курси'" prepend-icon="mdi-bookshelf"></v-list-item>
              <v-list-item title="Стрічка" @click="replaceFeed(), this.authStore.activePage='Стрічка'" prepend-icon="mdi-calendar-check-outline"></v-list-item>
              <v-list-item title="Групи" value="groups" @click="replaceGroup(), this.authStore.activePage='Групи'" prepend-icon="mdi-account-group-outline" ></v-list-item>

            </v-list>
            <v-footer class="footerMenu">
              <v-btn variant="outlined" color="light-blue-lighten-1" @click="authStore.logout()" class="logout-btn">
                Вийти
              </v-btn>
            </v-footer>

          </v-navigation-drawer>

        </v-layout>
      </v-card>
    </ion-menu>

    <ion-page id="main-content">
      <ion-header v-if="route.path !== '/tape/tape' && route.path !== '/tape/task' && route.path !== '/main/feed'" class="ion-no-border">
        <div>
          <v-toolbar
              dark

              prominent
              :elevation="0"
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sH6GCGsggznPZO2w47ZcJCqZoujYffx6r-7eRwoxhC-nSviTTIDImt0kKVWf-gPZ1p4&usqp=CAU"
          >


            <v-toolbar-title>{{ this.authStore.activePage }}</v-toolbar-title>

          </v-toolbar>
        </div>
      </ion-header>
      <ion-content class="ion-padding">

        <ion-router-outlet />

      </ion-content>

      <v-layout class="layout-footer" v-if="route.path !== '/tape/tape' && route.path !== '/tape/task'">
        <v-bottom-navigation class="bottom-nav rounded custom"
                             v-model="value"
                             :bg-color="color"


        >
          <v-btn class="btn-course-bottom btn-bottom-nav" @click="replaceFeed(), this.authStore.activePage='Стрічка'">
            <v-icon icon="mdi-calendar-check-outline" class="icon-course"/>
            <span>Стрічка</span>
          </v-btn>
          <v-btn class="btn-course-bottom btn-bottom-nav" @click="replaceCourse(), this.authStore.activePage='Курси'" v-if="this.user.role !== 'STUDENT'">
            <v-icon icon="mdi-book-outline" class="icon-course"/>
            <span>Курси</span>
          </v-btn>


          <v-btn class="btn-bottom-nav" @click="replaceGroup(), this.authStore.activePage='Групи'">
            <v-icon icon="mdi-account-group-outline"></v-icon>
            <span>Групи</span>
          </v-btn>

          <v-btn class="btn-bottom-nav btn-menu-bottom" content-id="main-content" >
            <ion-menu-button color="dark" class="pa-0"></ion-menu-button>
          </v-btn>

        </v-bottom-navigation>
      </v-layout>

    </ion-page>
  </ion-page>

</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AccountTeacher from "@/components/Teacher/AccountTeacher.vue";
import CourseTeacher from "@/components/Teacher/CourseTeacher.vue"
import TaskTeacher from "@/components/Teacher/TaskTeacher.vue"
import GroupTeacher from "@/components/Teacher/GroupTeacher.vue";
import PupilsTeacher from "@/components/Teacher/PupilsTeacher.vue"
import {ref} from "vue";
import {auth} from "@/stores/auth";
import { useRoute } from 'vue-router'


import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonLabel,
  IonItem,
  IonFooter,
  IonButton,
  IonIcon,
  IonRouterOutlet
} from "@ionic/vue";
import {course} from "@/stores/course";
import CoursePage from "@/components/Teacher/Course/CoursePage.vue";
import router from "@/router";
import {routerKey} from "vue-router";



export default defineComponent({

  components: {
    CoursePage,
    CourseTeacher,
    AccountTeacher,
    IonButtons,
    IonContent,
    IonHeader,
    IonMenu,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonList,
    IonLabel,
    IonItem,
    IonFooter,
    IonButton,
    IonIcon,
    TaskTeacher,
    GroupTeacher,
    PupilsTeacher,
    IonRouterOutlet,
  },

  data() {
    return {
      activePage: ref("Стрічка"),
      authStore: auth(),
      value: 0,
      numCount: 0,
      role: "",
      route: useRoute(),
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  computed: {
    routerKey() {
      return routerKey
    },
    color () {
      switch (this.value) {
        case 0: return '#ffedba'
        case 1: return '#efffba'
        case 2: return '#d3ffba'
        case 3: return '#bafff4'
        default: return '#d4baff'
      }
    },
  },


  methods: {
    closeMenu() {
      this.$refs.menu.close();
    },
    changePage(page: string){
      this.authStore.activePage = page;
    },
    router() {
      return router
    },
    checkRole(){
      let user = JSON.parse(localStorage.getItem('user'))
      this.role = user.role
    },
    replaceCourse(){
      this.checkRole()
      if(this.role === 'TEACHER'){
        router.replace('/main/courses')
      } else{
        router.replace('/main/course-student')
      }
    },
    replaceGroup(){
      this.checkRole()
      if(this.role === 'TEACHER'){
        router.replace('/main/groups')
      } else{
        router.replace('/main/groups-student')
      }
    },
    replaceAccount(){
      this.checkRole()
      if(this.role === 'TEACHER'){
        router.replace('/main/account')
      } else{
        router.replace('/main/student')
      }
    },
    replaceFeed(){
      this.checkRole()
      if(this.role === 'TEACHER') {
        router.replace('/main/feed')
      } else{
        router.replace('/main/feed-student')
      }
    }
  }
})
</script>

<style scoped>

.footerMenu {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;

}

ion-item {
  cursor: pointer;
}

ion-item:active {
  color: #3a7be0;

}

ion-item:hover {
  color: #7d7d7d;

}

.logout-btn {
  width: 90%;
  border-radius: 15px;
}

.list-menu {
  margin-top: 30%;
}

.layout-footer {
  max-height: 56px;
  width: 100%;

}

.bottom-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-bottom-nav span {
  padding-top: 3px; /* Adjust padding for smaller screens */
  font-weight: 700; /* Reduce font weight if needed */
}
.btn-bottom-nav {
  color: #000;
}
.btn-bottom-nav span{
  padding-top: 5px;
  font-weight: 900;
}
.btn-course-bottom span{
  margin-left: 20px;
}
.icon-course{
  margin-left: 20px;
}

</style>