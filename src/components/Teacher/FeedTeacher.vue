<script setup lang="ts">
import {IonPage, IonContent, IonFooter} from "@ionic/vue";
</script>

<template>
<ion-page>
  <ion-content>
    стрічка
  </ion-content>

  <ion-footer>


        <div class="container-footer">
          <v-text-field
              label="Коментар"
              class="text-from-teacher"
              variant="plain"
          >
          </v-text-field>
          <v-btn elevation="0" icon="mdi-send" class="btn-send-comment"></v-btn>
        </div>


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