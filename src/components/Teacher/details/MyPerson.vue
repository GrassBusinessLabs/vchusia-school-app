<template>
  <ion-page>
    <ion-header>
      <ion-buttons>
        <ion-button fill="outline" expand="block">Назад</ion-button>
      </ion-buttons>
      <ion-list>
        <ion-item>
          <ion-label>Моє ім'я:</ion-label>
          <ion-input></ion-input>
        </ion-item>

        <ion-item>
          <ion-label>Моє пошта:</ion-label>
          <ion-input></ion-input>
        </ion-item>
      </ion-list>
    </ion-header>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonButton,
    IonBackButton
} from "@ionic/vue";

import {auth} from "@/stores/auth";


export default defineComponent({
  name: "MyPerson",
  components: {
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonButtons,
    IonButton,
    IonBackButton
  },
  data() {
    return {
      nameUser: auth(),
    }
  },




});


</script>

<style scoped>
ion-buttons {
  width: 100%;
}

ion-button {
  width: 100%;
}
</style>