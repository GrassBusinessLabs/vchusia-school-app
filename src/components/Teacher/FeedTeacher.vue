<script setup lang="ts">
import {IonPage, IonContent, IonFooter, IonInput, IonItem, IonTextarea, IonHeader, onIonViewWillEnter} from "@ionic/vue";
import {computed, ref} from "vue";
import {message} from "@/stores/message";
import router from '../../router/index'
const MessageStore = message()
const tab = ref(null)
const userMessages = async () => {
  await MessageStore.userMessages()
}
onIonViewWillEnter(() => {
  userMessages()
})

const filterTags = ['Не перевірені', 'Очікуються', 'Решта']
const selectMessage = (message: any) => {
  MessageStore.thisMessage = message;
  MessageStore.msgId = message.id;
  router.replace('/main/solutions');
}

const groupedMessages = computed(() => {
  const grouped = {};
  MessageStore.allMessages.forEach(message => {
    const date = new Date(message.updatedDate).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(message);
  });

  const sortedGrouped = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return sortedGrouped.reduce((acc, date) => {
    acc[date] = grouped[date];
    return acc;
  }, {});

})

const formatDate = (dateString: any) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = new Date(dateString).toLocaleString('ua-UA', options);
  return formattedDate;
};

function isFutureDate(targetDate: any) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);
  return targetDateTime > currentDate;
}
</script>

<template>
<ion-page>
  <ion-header class="d-flex justify-center align-center header">


        <div class="d-flex justify-center">
          <v-chip-group  mandatory
                         selected-class="text-primary">
            <v-chip class="filterItem" v-for="tag of filterTags" :key="tag"> {{ tag }} </v-chip>

          </v-chip-group>
        </div>





  </ion-header>
  <ion-content>
    <v-card class="d-flex flex-column align-center">

      <v-card-text class="w-100">

<!--            <v-list class="list_feed">-->
<!--              <v-list-item v-for="i in MessageStore.allMessages" class="item_list_feed" @click="MessageStore.thisMessage = i, MessageStore.msgId = i.id ,$router.replace('/main/solutions')">-->

<!--                <v-list-item-title>-->
<!--                  {{ i.text }}-->
<!--                </v-list-item-title>-->

<!--                <v-list-item-action>-->
<!--                  {{ i.deadline }}-->
<!--                </v-list-item-action>-->

<!--              </v-list-item>-->
<!--            </v-list>-->
            <v-list class="list_feed">
              <template  class="subheader_date" v-for="(messages, date) in groupedMessages">
                <v-subheader>{{ date }}</v-subheader>
                <v-list-item
                    v-for="message in messages"
                    :key="message.id"
                    class="item_list_feed"
                    @click="selectMessage(message)"
                >
                  <v-list-item-title>{{ message.text }}</v-list-item-title>

                </v-list-item>
              </template>
            </v-list>



      </v-card-text>
    </v-card>


  </ion-content>

</ion-page>
</template>

<style scoped>
.list_feed{
  padding: 10px;

}
.item_list_feed{

  background: rgb(149,255,98);
  background: linear-gradient(96deg, rgba(149,255,98,0.4206057422969187) 0%, rgba(186,255,212,1) 100%);
  margin: 10px;
  height: 50px;
  color: grey;
  border-radius: 15px;
}

.header{
  height: 70px;
}
.filterItem{
  font-weight: 700;
}
</style>