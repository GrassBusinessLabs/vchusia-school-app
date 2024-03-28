<script setup lang="ts">
import {
  IonMenuButton,
  IonPage,
  IonFooter,
  IonContent,
  IonMenu,
  IonRouterOutlet, IonHeader, IonMenuToggle
} from "@ionic/vue";
import router from "@/router";
import {useRoute} from "vue-router";
import {ref} from "vue";
import {auth} from "@/stores/auth";
import Feed from "@/components/icons/feed.vue";
import Course from "@/components/icons/course.vue";
import Group from "@/components/icons/group.vue";
import MenuIcon from "@/components/icons/menuIcon.vue";
import ReadBookActive from "@/components/icons/read-book-active.vue";
import AppButton from "@/components/app-components/app-button.vue";
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
function replaceFeed(){
  checkRole()
  if(role === 'TEACHER') {
    router.replace('/main/feed')
  } else{
    router.replace('/main/feed-student')
  }
}


</script>

<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <ion-menu content-id="main-content" class="menu" side="end">

      <v-card>
        <v-layout>
          <v-navigation-drawer
              class="nav-menu w-100"
              permanent
              rail
          >
            <v-divider></v-divider>

            <v-list nav class="list-menu card-menu">
              <v-list-item title="Обліковий запис" value="account"
                           @click="replaceAccount(); activePage='Обліковий запис';">
                <template v-slot:prepend>
                  <read-book-active/>
                </template>
              </v-list-item>

              <v-list-item class="list-item" title="Стрічка" @click="replaceFeed(); activePage='Стрічка'">

                <template v-slot:prepend>
                  <feed/>
                </template>
              </v-list-item>

              <v-list-item title="Групи" value="groups"
                           @click="replaceGroup(); activePage='Групи'"
              >
                <template v-slot:prepend>
                  <group/>
                </template>
              </v-list-item>

            </v-list>
            <v-footer class="footerMenu card-menu">
              <app-button @click="authStore.logout()">Вийти</app-button>
            </v-footer>

          </v-navigation-drawer>

        </v-layout>
      </v-card>
    </ion-menu>

    <ion-page id="main-content">

      <ion-content class="ion-padding">

        <ion-router-outlet class="margin-styled"/>

      </ion-content>
      <div class="footer">
        <div class="bottom-nav">

          <v-btn class="btn-bottom-nav" size="x-small" :stacked="true"
                 @click="$router.replace('/main/groups-student')">
            <div>
              <v-icon icon="mdi-arrow-left" size="40" class="icon-course"/>
              <span class="text-set">Назад</span>
            </div>
          </v-btn>

          <v-btn class="btn-bottom-nav" @click="$router.replace('/group-info-student/feed-group-student')" size="x-small"
                 :stacked="true">
            <div>
              <feed class="svg"/>
              <span class="text-set">Стрічка</span>
            </div>
          </v-btn>

          <v-btn class="btn-bottom-nav" size="x-small" :stacked="true"
                 @click="$router.replace('/group-info-student/task-group-student')">
            <div>
              <group class="svg"/>
              <span class="text-set">Завдання</span>
            </div>
          </v-btn>

          <v-btn class="btn-bottom-nav" size="x-small" :stacked="true">
            <ion-menu-toggle>
              <div>
                <menu-icon class="svg"/>
                <span class="text-set">Меню</span>
              </div>
            </ion-menu-toggle>


          </v-btn>
        </div>
      </div>
<!--      <v-layout class="overflow-visible layout-footer">-->
<!--        <v-bottom-navigation class="bottom-nav rounded custom"-->
<!--                             v-model="value"-->
<!--                             :grow='true'-->

<!--        >-->
<!--          <v-btn class="btn-course-bottom btn-bottom-nav" @click="$router.replace('/main/groups-student')">-->
<!--            <template v-slot:append>-->
<!--              <v-icon icon="mdi-arrow-left" class="icon-course"/>-->
<!--            </template>-->
<!--          </v-btn>-->


<!--          <v-btn class="btn-course-bottom btn-bottom-nav" @click="$router.replace('/group-info-student/feed-group-student'), title = 'Стрічка'">-->
<!--            <v-icon icon="mdi-tooltip-check-outline" class="icon-course"/>-->
<!--            <span>Стрічка</span>-->

<!--          </v-btn>-->

<!--          <v-btn class="btn-bottom-nav" @click="$router.replace('/group-info-student/task-group-student'), title = 'Завдання'">-->
<!--            <v-icon icon="mdi-calendar-check-outline"></v-icon>-->
<!--            <span>Завдання</span>-->

<!--          </v-btn>-->

<!--          <v-btn class="btn-bottom-nav btn-menu-bottom" content-id="main-content">-->

<!--            <ion-menu-button color="dark"></ion-menu-button>-->
<!--            <span>Меню</span>-->

<!--          </v-btn>-->
<!--        </v-bottom-navigation>-->
<!--      </v-layout>-->

    </ion-page>
  </ion-page>

</template>

<style scoped>
.nav-menu{
  background: rgb(243, 233, 224);

  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
}
ion-menu::part(backdrop) {
  background-color: transparent;
}
ion-menu::part(container) {
  background-color: transparent;

}
.list-menu {
  margin: 16px;

  & .v-list-item{
    border-radius: 16px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgb(255, 248, 237);
    padding: 5px 10px;
    margin: 10px 0;
    color: rgb(66, 126, 154);
  }
}
.card-menu{
  background: rgb(243, 233, 224);
}


.margin-styled {
  margin-bottom: 9vh;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 10vh;
  display: flex;
  width: 100%;
  border-radius: 16px 16px 0px 0px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(254, 245, 235);
}

.bottom-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 16px;
  border-radius: 16px 16px 0px 0px;
}

.btn-bottom-nav {
  border-radius: 9px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -1px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.15), 0px -2px 4px 2px rgba(0, 0, 0, 0.04);
  background: rgb(254, 245, 235);
  text-transform: none;
  text-align: center;
  min-height: calc(100% - 3vh);

  & div {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    & span {
      font-size: 10px;
      font-weight: 400;
      line-height: 12px;
      text-align: left;
    }
  }

  & .svg {
    width: 40px;
    height: 40px;

  }
}
.text-set {
  color: rgb(66, 126, 154);
}

.isActive {
  color: rgb(205, 150, 129);
}

@media screen and (max-width: 382px) {
  .margin-styled {
    margin-bottom: 10vh;
  }
  .footer {
    height: 12vh;
  }
  .bottom-nav {
    gap: 8px;
  }
  .btn-bottom-nav {
    min-height: 80%;
  }
}
.icon-course{
  color: rgb(66, 126, 154)
}

.footerMenu {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 90%;
  transform:translate(-50%, -50%);
}















</style>