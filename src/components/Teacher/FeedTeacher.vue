<script setup lang="ts">
import {IonPage, IonContent, IonFooter, IonInput, IonItem, IonTextarea, onIonViewWillEnter} from "@ionic/vue";
import {ref} from "vue";
import {message} from "@/stores/message";

const MessageStore = message()

const userMessages = async () => {
  await MessageStore.userMessages()
}
onIonViewWillEnter(() => {
  userMessages()
})
</script>

<template>
<ion-page>
  <ion-content>
    <v-list class="list_feed">
      <v-list-item v-for="i in MessageStore.allMessages" class="item_list_feed" @click="MessageStore.thisMessage = i, MessageStore.msgId = i.id ,$router.replace('/main/solutions')">

        <v-list-item-title>
          {{ i.text }}
        </v-list-item-title>

        <v-list-item-action>
          {{ i.deadline }}
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