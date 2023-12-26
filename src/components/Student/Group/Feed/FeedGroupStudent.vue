<script setup lang="ts">
import {IonContent, IonPage, onIonViewWillEnter} from "@ionic/vue";
import {group} from "@/stores/group";
import {course} from "@/stores/course"
import {post} from "@/stores/post";
import {onMounted} from "vue";


const GroupStore = group()
const CourseStore = course()
const PostStore = post()
const pagination = {
  page: 1,
  count: 10
}
async function getSharedPost () {
  PostStore.feedPosts = []
  await PostStore.getPosts(pagination, GroupStore.idGroup, CourseStore.courseId)
}

onIonViewWillEnter(() => {getSharedPost()})

</script>

<template>
<ion-page>
  <ion-content>
    <v-list>
      <v-list-item v-for="i of PostStore.feedPosts" class="itemListFeed">
        <v-list-item-title>
          {{i.title}}
        </v-list-item-title>

        <v-list-item-subtitle>
          {{i.deadline}}
        </v-list-item-subtitle>
      </v-list-item>
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