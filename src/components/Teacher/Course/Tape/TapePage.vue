<script setup lang="ts">

import {IonContent, IonPage, IonFooter, IonIcon, onIonViewWillEnter} from "@ionic/vue";
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

  <ion-footer>


<!--    <v-btn icon="mdi-plus" @click="sheet_comment = !sheet_comment" class="d-flex justify-center align-center mb-2 mx-auto"></v-btn>-->

    <div class="text-center">
      <v-btn class="btn-add-course mb-1" size="large" @click="sheet_comment = !sheet_comment">
        <ion-icon :icon="add" color="danger" id="open-modal" ></ion-icon>
      </v-btn>
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
.btn-add-course {
  min-width: 30px;
  border-radius: 50px;
  margin-top: 10px;
}
</style>