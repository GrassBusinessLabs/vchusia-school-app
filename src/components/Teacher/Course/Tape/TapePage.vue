<script setup lang="ts">

import {IonContent, IonPage, IonFooter, IonIcon, onIonViewWillEnter, IonInput, IonItem} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {onBeforeMount, onMounted, onUpdated, ref} from "vue";
import {add} from "ionicons/icons";
import {group} from "@/stores/group";
import {course} from "@/stores/course";
import {post} from "@/stores/post";

const sheet_comment = ref(false)
const comment = ref('')
const user = JSON.parse(localStorage.getItem('user'))
const GroupStore = group()
const CourseStore = course()
const PostStore = post()

const pagination = {
  page: 1,
  count: 10
}

async function getFeed() {
  await PostStore.getPosts(pagination, GroupStore.groupId, CourseStore.courseId);
}

onIonViewWillEnter(() => {
  getFeed();
});

</script>

<template>

<ion-page>
  <ion-content>
    <v-card elevation="0">
      <v-list class="tape_list" v-for="i of PostStore.feedPosts">
        <v-list-item class="tape_list_item">
          <v-list-item-title>
            {{i.title}}
          </v-list-item-title>

          <v-list-item-subtitle>
            {{i.description}}
          </v-list-item-subtitle>

          <v-list-item-action>
            {{i.id}}
          </v-list-item-action>
        </v-list-item>


      </v-list>
    </v-card>

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
.tape_list{
  margin: 5px;
  padding: 0;
}

.tape_list_item{
  border-radius: 10px;
  margin: 5px;
  background: rgb(85,255,216);
  background: linear-gradient(207deg, rgba(85,255,216,1) 16%, rgba(214,255,255,1) 100%);
  color: grey;
}
.container-footer{
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.text-from-teacher{
  width: 90%;
  margin: 20px auto 0 auto;
  box-sizing: border-box;
}
.btn-send-comment{
  margin: 0 10px;
}
</style>