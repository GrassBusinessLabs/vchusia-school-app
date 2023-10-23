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
          </ion-item>

          <ion-item @click.prevent="activePage = 'Курси'">
            <ion-label>
              Курси
            </ion-label>
          </ion-item>

          <ion-item @click.prevent="activePage = 'Завдання'">
            <ion-label>
              Завдання
            </ion-label>
          </ion-item>

          <ion-item @click.prevent="activePage = 'Групи'">
            <ion-label>
              Групи
            </ion-label>
          </ion-item>

          <ion-item @click.prevent="activePage = 'Учні'">
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
        <AccountStudent v-if="activePage === 'Обліковий запис'"/>
        <CourseStudent v-if="activePage === 'Курси'"/>
      </ion-content>
    </ion-page>
  </ion-page>

</template>

<script lang="ts">
import {defineComponent} from 'vue';

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
import AccountStudent from "@/components/Student/AccountStudent.vue";
import CourseStudent from "@/components/Student/CourseStudent.vue";


export default defineComponent({

  components: {
    CourseStudent,
    AccountStudent,
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