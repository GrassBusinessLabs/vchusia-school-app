<script setup lang="ts">

import {IonContent, IonPage} from "@ionic/vue";
</script>

<template>

<ion-page>
  <ion-content>
    <v-card>
      <v-list>
        <v-list-item title="Post title" subtitle="Post Subtitle" v-for="i in 10"></v-list-item>
      </v-list>
    </v-card>

  </ion-content>
</ion-page>

</template>

<style scoped>

</style>