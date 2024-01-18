<script setup lang="ts">
import {IonPage, IonContent, IonFooter, IonInput, IonItem, IonTextarea} from "@ionic/vue";
import {ref} from "vue";


</script>

<template>
<ion-page>
  <ion-content>
    стрічка
  </ion-content>

  <ion-footer class="d-flex align-center">
    <ion-item class="w-100" >
      <ion-textarea
          :rows="1"
          :auto-grow="true"
          placeholder="Напишіть коментар"
      >
      </ion-textarea>

    </ion-item>
    <v-btn icon="mdi-send" elevation="0"></v-btn>


  </ion-footer>
</ion-page>
</template>

<style scoped>

</style>