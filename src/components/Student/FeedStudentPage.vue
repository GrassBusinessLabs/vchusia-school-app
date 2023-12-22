<script setup lang="ts">
import {IonPage, IonContent} from "@ionic/vue";
</script>

<template>
  <ion-page>

    <ion-content>
      <v-list>
        <v-list-item v-for="i of 10" :title="i" class="itemListFeed"></v-list-item>
      </v-list>
    </ion-content>

  </ion-page>
</template>

<style scoped>
.itemListFeed{
  height: 50px;
  outline: 1px ridge cyan;
  border-radius: 20px;
  margin: 15px;
}
</style>