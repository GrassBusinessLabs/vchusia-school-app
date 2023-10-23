<template>
  <ion-page>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Меню</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list>
          <ion-item @click.prevent="activePage = 'Обліковий запис'">
            <ion-label>
              Обліковий запис
            </ion-label>
            <p class="nameUser">
              {{this.user.name}}

            </p>

          </ion-item>

          <ion-item @click.prevent="activePage = 'Курси'">
            <ion-label>
              Курси
            </ion-label>
          </ion-item>

          <ion-item @click="activePage = 'Завдання'">
            <ion-label>
              Завдання
            </ion-label>
          </ion-item>

          <ion-item @click="activePage = 'Групи'">
            <ion-label>
              Групи
            </ion-label>
          </ion-item>

          <ion-item @click="activePage = 'Учні'">
            <ion-label>
              Учні
            </ion-label>
          </ion-item>


        </ion-list>


      </ion-content>

      <ion-footer class="footerMenu">
        <ion-buttons class="btns-out">
          <ion-button @click="authStore.logout()" fill="solid" expand="block" class="logout-btn" color="danger">Вийти</ion-button>
        </ion-buttons>
      </ion-footer>
    </ion-menu>
    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ this.activePage }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <AccountTeacher v-if="activePage === 'Обліковий запис'"/>
        <CourseTeacher v-else-if="activePage === 'Курси'"/>
        <TaskTeacher v-else-if="activePage === 'Завдання'"/>
        <GroupTeacher v-else-if="activePage === 'Групи'"/>
        <PupilsTeacher v-else-if="activePage === 'Учні'"/>
      </ion-content>
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
  IonIcon
} from "@ionic/vue";
import {course} from "@/stores/course";


export default defineComponent({

  components: {
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
    PupilsTeacher
  },

  data() {
    return {
      activePage: ref("Курси"),
      authStore: auth(),
      user: JSON.parse(localStorage.getItem('user'))

    }
  },

  methods: {


  }
})


</script>

<style scoped>
.footerMenu {
  display: flex;
  justify-content: center;
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

.btns-out {
  width: 90%;
}

.logout-btn {
  width: 100%;
}
.nameUser{
  color: #7974ff;
  font-weight: 700;
}

</style>