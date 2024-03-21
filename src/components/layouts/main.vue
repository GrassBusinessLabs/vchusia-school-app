<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <ion-menu content-id="main-content" class="menu" side="end" ref="menu">
      <v-card >
        <v-layout>
          <v-navigation-drawer
              class="nav-menu card-menu w-100"
              permanent
          >
            <v-divider></v-divider>

            <v-list nav class="list-menu ">
              <v-list-item title="Обліковий запис" value="account"
                           @click="replaceAccount(), this.value = 'default';this.authStore.activePage='Обліковий запис';"
                           prepend-icon="mdi-account-circle-outline"></v-list-item>
              <v-list-item v-if="this.user.role !== 'STUDENT'" title="Курси" value="course"
                           @click="replaceCourse(), this.value = 2; this.authStore.activePage='Курси'"
                           prepend-icon="mdi-bookshelf"></v-list-item>
              <v-list-item title="Стрічка" @click="replaceFeed(), this.authStore.activePage='Стрічка'; this.value = 0;"
                           prepend-icon="mdi-calendar-check-outline"></v-list-item>
              <v-list-item title="Групи" value="groups"
                           @click="replaceGroup(), this.authStore.activePage='Групи'; this.value = 1;"
                           prepend-icon="mdi-account-group-outline"></v-list-item>

            </v-list>
            <v-footer class="footerMenu card-menu">
<!--              <v-btn variant="outlined"  @click="authStore.logout()" class="logout-btn">-->
<!--                Вийти-->
              <app-button @click="authStore.logout()">Вийти</app-button>
<!--              </v-btn>-->
            </v-footer>

          </v-navigation-drawer>

        </v-layout>
      </v-card>
    </ion-menu>

    <ion-page id="main-content">
      <!--      <ion-header v-if="route.path !== '/tape/tape' && route.path !== '/tape/task' && route.path !== '/main/feed'" class="ion-no-border">-->
      <!--        <div>-->
      <!--          <v-toolbar-->
      <!--              dark-->

      <!--              prominent-->
      <!--              :elevation="0"-->
      <!--              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sH6GCGsggznPZO2w47ZcJCqZoujYffx6r-7eRwoxhC-nSviTTIDImt0kKVWf-gPZ1p4&usqp=CAU"-->
      <!--          >-->


      <!--            <v-toolbar-title>{{ this.authStore.activePage }}</v-toolbar-title>-->

      <!--          </v-toolbar>-->
      <!--        </div>-->
      <!--      </ion-header>-->
      <ion-content class="ion-padding">
        <ion-router-outlet class="margin-styled"/>

      </ion-content>

      <!--      <v-layout class="layout-footer" v-if="route.path !== '/tape/tape' && route.path !== '/tape/task'">-->
      <!--        <v-bottom-navigation class="navigation-bottom">-->
      <!--          <v-btn class="btn-course-bottom btn-bottom-nav"-->
      <!--                 @click="replaceFeed(), this.value = 0; this.authStore.activePage='Стрічка'">-->
      <!--            <v-icon icon="mdi-calendar-check-outline" class="icon-course"/>-->
      <!--            <span>Стрічка</span>-->
      <!--          </v-btn>-->
      <!--          <v-btn class="btn-bottom-nav" @click="replaceGroup(), this.value = 1; this.authStore.activePage='Групи'">-->
      <!--            <v-icon icon="mdi-account-group-outline"></v-icon>-->
      <!--            <span>Групи</span>-->
      <!--          </v-btn>-->
      <!--          <v-btn class="btn-course-bottom btn-bottom-nav"-->
      <!--                 @click="replaceCourse(), this.value = 2; this.authStore.activePage='Курси'"-->
      <!--                 v-if="this.user.role !== 'STUDENT'">-->
      <!--            <v-icon icon="mdi-book-outline" class="icon-course"/>-->
      <!--            <span>Курси</span>-->
      <!--          </v-btn>-->


      <!--          <v-btn class="btn-bottom-nav btn-menu-bottom" @click='this.value = 3;' content-id="main-content">-->
      <!--            <ion-menu-button color="dark" class="pa-0"></ion-menu-button>-->
      <!--          </v-btn>-->

      <div class="footer">
        <div class="bottom-nav">

          <v-btn class="btn-bottom-nav" size="x-small" :stacked="true"
                 @click="replaceCourse(); this.authStore.activePage = 'Курси'">
            <div>
              <course class="svg"/>
              <span class="text-set" :class="{'isActive' : this.authStore.activePage === 'Курси'}">Курси</span>
            </div>
          </v-btn>

          <v-btn class="btn-bottom-nav" @click="replaceFeed(); this.authStore.activePage = 'Стрічка'" size="x-small"
                 :stacked="true">
            <div>
              <feed class="svg"/>
              <span class="text-set" :class="{'isActive' : this.authStore.activePage === 'Стрічка'}">Стрічка</span>
            </div>
          </v-btn>

          <v-btn class="btn-bottom-nav" size="x-small" :stacked="true"
                 @click="replaceGroup(); this.authStore.activePage = 'Групи'">
            <div>
              <group class="svg"/>
              <span class="text-set" :class="{'isActive' : this.authStore.activePage === 'Групи'}">Групи</span>
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


      <!--        </v-bottom-navigation>-->
      <!--      </v-layout>-->

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
import {useRoute} from 'vue-router'


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
  IonRouterOutlet,
  IonMenuToggle
} from "@ionic/vue";
import {course} from "@/stores/course";
import CoursePage from "@/components/Teacher/Course/CoursePage.vue";
import router from "@/router";
import {routerKey} from "vue-router";
import Feed from "@/components/icons/feed.vue";
import Course from "@/components/icons/course.vue";
import Group from "@/components/icons/group.vue";
import Menu from "@/components/icons/menuIcon.vue";
import MenuIcon from "@/components/icons/menuIcon.vue";
import AppButton from "@/components/app-components/app-button.vue";


export default defineComponent({

  components: {
    AppButton,
    MenuIcon,
    Menu,
    Group,
    Course,
    Feed,
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
    IonMenuToggle
  },

  data() {
    return {
      activePage: ref("Стрічка"),
      authStore: auth(),
      value: 0,
      numCount: 0,
      role: "",
      route: useRoute(),
      user: JSON.parse(localStorage.getItem('user')),
    }
  },
  computed: {
    routerKey() {
      return routerKey
    },
  },


  methods: {


    changePage(page: string) {
      this.authStore.activePage = page;
    },
    router() {
      return router
    },
    checkRole() {
      let user = JSON.parse(localStorage.getItem('user'))
      this.role = user.role
    },
    replaceCourse() {
      this.checkRole()
      if (this.role === 'TEACHER') {
        router.replace('/main/courses')
      } else {
        router.replace('/main/course-student')
      }
    },
    replaceGroup() {
      this.checkRole()
      if (this.role === 'TEACHER') {
        router.replace('/main/groups')
      } else {
        router.replace('/main/groups-student')
      }
    },
    replaceAccount() {
      this.checkRole()
      if (this.role === 'TEACHER') {
        router.replace('/main/account')
      } else {
        router.replace('/main/student')
      }
    },
    replaceFeed() {
      this.checkRole()
      if (this.role === 'TEACHER') {
        router.replace('/main/feed')
      } else {
        router.replace('/main/feed-student')
      }
    }
  }
})
</script>

<style scoped>
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

    & span{
      font-family: Inter, sans-serif;
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


.footerMenu {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  width: 90%;
  transform:translate(-50%, -50%);


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
  color: rgb(255, 248, 237);
  text-transform: none;
  font-size: 16px;
  width: 100%;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  border-radius: 43px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 34px 10px 34px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5),inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25),0px 4px 8px 0px rgba(169, 163, 157, 0.25),0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(66, 126, 154);
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

</style>