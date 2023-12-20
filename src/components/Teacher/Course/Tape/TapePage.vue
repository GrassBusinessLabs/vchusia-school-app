<script setup lang="ts">

import {IonContent, IonPage, IonFooter} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {ref} from "vue";

const sheet_comment = ref(false)
const comment = ref('')
const user = JSON.parse(localStorage.getItem('user'))
</script>

<template>

<ion-page>
  <ion-content>
    <v-card elevation="0">
      <v-list class="tape_list">
        <v-list-item :title="user.name" subtitle="Коментар" v-for="i in 3" class="tape_list_item">
          <v-list-item-action></v-list-item-action>
        </v-list-item>

        <v-list-item :title="user.name" subtitle="Пост" v-for="i in 2" class="tape_list_item"></v-list-item>

      </v-list>
    </v-card>

  </ion-content>

  <ion-footer>

    <v-btn icon="mdi-plus" @click="sheet_comment = !sheet_comment" class="d-flex justify-center align-center mb-2 mx-auto"></v-btn>

    <div class="text-center">
      <v-bottom-sheet v-model="sheet_comment">
        <v-card height="250" >
          <v-card-text>
            <v-textarea
              variant="outlined"
              density="compact"
              v-model="comment"
            ></v-textarea>

            <v-btn class="d-flex justify-center align-center mx-auto" color="purple" @click="sheet_comment = !sheet_comment">
              Коментувати
            </v-btn>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </div>


  </ion-footer>
</ion-page>

</template>

<style scoped>
.tape_list{

}

.tape_list_item{
  border-radius: 10px;
  margin: 12px;
  background: rgb(85,255,216);
  background: linear-gradient(207deg, rgba(85,255,216,1) 16%, rgba(214,255,255,1) 100%);
  color: grey;
}
</style>