<script setup lang="ts">
import {IonPage, IonContent, IonFooter, IonInput, IonItem} from "@ionic/vue";
</script>

<template>
<ion-page>
  <ion-content>
    стрічка
  </ion-content>

  <ion-footer class="d-flex align-center">
    <ion-item class="w-100">
      <ion-input
          label-placement="stacked"
          placeholder="Напишіть коментар"
      >
      </ion-input>

    </ion-item>
    <v-btn icon="mdi-send" elevation="0"></v-btn>


  </ion-footer>
</ion-page>
</template>

<style scoped>
.container-footer {
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;
}

.text-from-teacher {
  width: 90%;
  margin: 20px auto 0 auto;
  box-sizing: border-box;
}

.btn-send-comment {
  margin: 0 10px;
}
</style>