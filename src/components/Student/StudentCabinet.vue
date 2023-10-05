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
          <ion-item>
            <ion-label>
              Обліковий запис
            </ion-label>
          </ion-item>

          <ion-item>
            <ion-label>
              Курси
            </ion-label>
          </ion-item>

          <ion-item >
            <ion-label>
              Завдання
            </ion-label>
          </ion-item>

          <ion-item >
            <ion-label>
              Групи
            </ion-label>
          </ion-item>

          <ion-item>
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


export default defineComponent({

  components: {
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
      activePage: ref("Обліковий запис"),
      authStore: auth()
    }
  },


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


</style>