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