<template>
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

        <ion-item>
          <ion-label>
            Завдання
          </ion-label>
        </ion-item>

        <ion-item>
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
      <ion-buttons>
        <ion-button @click="logoutClick">Вийти</ion-button>
      </ion-buttons>
    </ion-footer>
  </ion-menu>
  <ion-page id="main-content">
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title></ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <AccountTeacher/>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import AccountTeacher from "@/components/Teacher/AccountTeacher.vue";
import CourseTeacher from "@/components/Teacher/CourseTeacher.vue"
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
  IonButton
} from "@ionic/vue";

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
    IonButton
  },

  methods: {

    logoutClick() {
      const axios = require('axios');

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://vchusia.grassbusinesslabs.tk/api/v1/auth/logout',
        headers: {
          'access-control-request-headers': 'authorization,content-type',
          'access-control-request-method': 'GET',
          'origin': 'http://192.168.0.111:8100',
          'Authorization': 'Bearer {{token}}'
        }
      };

      axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
    }

  }
})


</script>

<style scoped>
.footerMenu {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}
</style>