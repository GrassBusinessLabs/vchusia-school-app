<script setup lang="ts">
import {
  IonMenuButton,
  IonPage,
  IonFooter,
  IonContent,
  IonMenu,
  IonRouterOutlet, IonHeader
} from "@ionic/vue";
import router from "@/router";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {auth} from "@/stores/auth";
const activePage = ref("Стрічка")
const title = ref('Стрічка')
const value = ref(1)
let role = ref("")
const authStore = auth()
function checkRole(){
  let user = JSON.parse(localStorage.getItem('user'))
  role = user.role
}
function replaceAccount(){
  checkRole()
  if(role === 'TEACHER'){
    router.replace('/main/account')
  } else{
    router.replace('/main/student')
  }
}

function replaceCourse(){
  checkRole()
  if(role === 'TEACHER'){
    router.replace('/main/courses')
  } else{
    router.replace('/main/course-student')
  }
}

function replaceGroup(){
  checkRole()
  if(role === 'TEACHER'){
    router.replace('/main/groups')
  } else{
    router.replace('/main/groups-student')
  }
}
</script>

<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <ion-menu content-id="main-content" class="menu" side="end">
      <ion-header>
        <v-toolbar
            dark
            prominent
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sH6GCGsggznPZO2w47ZcJCqZoujYffx6r-7eRwoxhC-nSviTTIDImt0kKVWf-gPZ1p4&usqp=CAU"
        >

          <v-toolbar-title>Меню</v-toolbar-title>

        </v-toolbar>
      </ion-header>
      <v-card>
        <v-layout>
          <v-navigation-drawer
              class="nav-menu"
              permanent
          >
            <v-divider></v-divider>

            <v-list nav class="list-menu">
              <v-list-item title="Обліковий запис" value="account" @click="replaceAccount(), activePage='Обліковий запис'" prepend-icon="mdi-account-circle-outline"></v-list-item>
              <v-list-item title="Курси" value="course" @click="replaceCourse(), activePage='Курси'" prepend-icon="mdi-bookshelf"></v-list-item>
              <v-list-item title="Завдання" value="task" @click="$router.replace('/main/tasks'), activePage='Завдання'" prepend-icon="mdi-briefcase-outline"></v-list-item>
              <v-list-item title="Групи" value="groups" @click="replaceGroup(), activePage='Групи'" prepend-icon="mdi-account-group-outline" ></v-list-item>
              <v-list-item title="Учні" value="pupils" @click="$router.replace('/main/tasks'), activePage='Учні'" prepend-icon="mdi-school-outline"></v-list-item>

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
      <ion-header>
        <div>
          <v-toolbar
              dark
              prominent
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sH6GCGsggznPZO2w47ZcJCqZoujYffx6r-7eRwoxhC-nSviTTIDImt0kKVWf-gPZ1p4&usqp=CAU"
          >


            <v-toolbar-title>{{ title }}</v-toolbar-title>

          </v-toolbar>
        </div>
      </ion-header>
      <ion-content class="ion-padding">

        <ion-router-outlet/>

      </ion-content>
      <v-layout class="overflow-visible layout-footer">
        <v-bottom-navigation class="bottom-nav rounded custom"
                             v-model="value"
                             :grow='true'

        >
          <v-btn class="btn-course-bottom btn-bottom-nav" @click="$router.replace('/main/groups-student')">
            <template v-slot:append>
              <v-icon icon="mdi-arrow-left" class="icon-course"/>
            </template>
          </v-btn>


          <v-btn class="btn-course-bottom btn-bottom-nav" @click="router.push('/group-info-student/feed-group-student'), title = 'Стрічка'">
            <v-icon icon="mdi-tooltip-check-outline" class="icon-course"/>
            <span>Стрічка</span>

          </v-btn>

          <v-btn class="btn-bottom-nav" @click="router.push('/group-info-student/task-group-student'), title = 'Завдання'">
            <v-icon icon="mdi-calendar-check-outline"></v-icon>
            <span>Завдання</span>

          </v-btn>

          <v-btn class="btn-bottom-nav btn-menu-bottom" content-id="main-content">

            <ion-menu-button color="dark"></ion-menu-button>
            <span>Меню</span>

          </v-btn>
        </v-bottom-navigation>
      </v-layout>

    </ion-page>
  </ion-page>

</template>

<style scoped>
ion-item {
  cursor: pointer;
}

ion-item:active {
  color: #3a7be0;

}

ion-item:hover {
  color: #7d7d7d;

}


.layout-footer {
  max-height: 10vh;
  width: 100%;

}

.bottom-nav {
  display: flex;
  justify-content: center;
}

.btn-bottom-nav {
  color: #000;
}
.btn-bottom-nav span{
  font-weight: 900;
}
.btn-course-bottom span{
  margin-left: 20px;
}
.icon-course{
  margin-left: 20px;
}
ion-menu-button{
  height: 20px;
}
.btn-menu-bottom{
  margin-right: 10px;
}


.custom {
  min-height: 67px;
}

span {
  font-size: 14px;
}

.v-bottom-navigation {
  z-index: 1;
}

..footerMenu {
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
  max-height: 10vh;
  width: 100%;

}

.bottom-nav {
  display: flex;
  justify-content: center;
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