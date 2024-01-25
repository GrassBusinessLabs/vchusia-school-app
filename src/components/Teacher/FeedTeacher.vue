<script setup lang="ts">
import {IonPage, IonContent, IonFooter, IonInput, IonItem, IonTextarea} from "@ionic/vue";
import {ref} from "vue";


</script>

<template>
<ion-page>
  <ion-content>
    <v-list class="list_feed">
      <v-list-item v-for="i in 5" class="item_list_feed" @click="$router.replace('/main/solutions')">

        <v-list-item-title>
          Title
        </v-list-item-title>

        <v-list-item-action>
          action
        </v-list-item-action>

      </v-list-item>
    </v-list>
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
    <v-btn class="bg-transparent" icon="mdi-send" elevation="0"></v-btn>


  </ion-footer>
</ion-page>
</template>

<style scoped>
.list_feed{
  padding: 10px;

}
.item_list_feed{
  outline: 1px solid black;
  margin: 10px;
  border-radius: 15px;
}
</style>