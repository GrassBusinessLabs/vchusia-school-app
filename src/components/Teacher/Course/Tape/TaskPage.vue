<script setup lang="ts">

import {IonCol, IonContent, IonGrid, IonRow, IonPage, IonFooter, onIonViewWillEnter} from "@ionic/vue";

import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {course} from "@/stores/course";
import {group} from "@/stores/group";
import {post} from "@/stores/post"
import {sharePost} from "@/models/Post";
import {onMounted, reactive, ref, watch} from "vue";

const tab = ref('Tape')
const CourseStore = course()
const PostStore = post()
const GroupStore = group()
const sheet_read = ref(false)
const dialog = ref(false)
const courseInfo = CourseStore.thisCourse
const userSharePost = ref(false)
let items = []
let groups: any = []
let allIdPosts: any = []
let r, c;
const switchMode = ref(true)
const postShared = ref(false)
allIdPosts = []
const shared = ref(true)
const checkboxes = ref({})

async function getUsersInGroup() {
  GroupStore.usersInGroup = []
  await GroupStore.getUsersInGroup(GroupStore.idGroup)
}

onIonViewWillEnter(() => {getUsersInGroup()})
const mapPosts = () => {
  const rows = PostStore.PostInfo.map(post => post.row)
  const uniqueSet = Array.from(new Set(rows))
  const mappedUniqueSet = uniqueSet.map(row => {
    return {
      row: row,
      groups: PostStore.PostInfo.filter(item => item.row === row)
    }
  })
  return mappedUniqueSet
}

for (let i of PostStore.PostInfo){
  allIdPosts.push(i.id)
}
console.log(allIdPosts)
const getPostByCords = (row: any, column: any) => {
  if(PostStore.feedPosts.find(post => post.row === row && post.column === column) !== undefined){
    if(PostStore.feedPosts.find(post => post.row === row && post.column === column).id == PostStore.PostInfo.find(post => post.row === row && post.column === column).id){
      PostStore.PostInfo.find(post => post.row === row && post.column === column).color = 'grey'
    }
  }
  return PostStore.PostInfo.find(post => post.row === row && post.column === column)
}



const handlePost = (row: any, column: any) => {

  let idPost
  if (getPostByCords(row + 1, column)) {

    if (switchMode.value === true) {
      sheet_read.value = true

      for (let i of PostStore.PostInfo) {
        if (row + 1 === i.row && column === i.column) {
          postShared.value = false
          console.log(i.id)
          idPost = i.id
          PostStore.idPostsNow = i.id
          PostStore.info = i
        }
      }
      for (const j of PostStore.feedPosts){
        if(j.id === idPost){
          postShared.value = true
          console.log(true)
        }
      }
    } else {
      GroupStore.allGroups = []
      GroupStore.getCreatedGroupsList()

      console.log('edit create')
      for (let i of PostStore.PostInfo) {
        if (row + 1 === i.row && column === i.column) {
          console.log(i.id)
          idPost = i.id
          PostStore.idPostsNow = i.id
          PostStore.info = i
        }
      }
    }

  }

  return idPost, r, c, items

}

let sharePostBody = reactive({
  groups: null,
  comment: "",
  deadline: ""
})

const sharePostOpenSheet = () => {
  sheet_read.value = false
  dialog.value = true
  userSharePost.value = false

}
const sharePost = async () => {
  const body: sharePost = {
    users: [29],
    groupId: GroupStore.idGroup,
    comment: sharePostBody.comment,
    deadline: new Date(sharePostBody.deadline).toISOString()
  }
  await PostStore.sharePost(body)
  getFeed()
  dialog.value = false
}

const lastPost = (id: any) => {
  if(allIdPosts.indexOf(id) > 0){
    for(let i of PostStore.PostInfo){
      if(allIdPosts[allIdPosts.indexOf(id) - 1] === i.id){
        PostStore.info = i

      }

    }

  }
}

const nextPost = (id: any) => {
  if(allIdPosts.indexOf(id) !== allIdPosts.length - 1){
    for(let i of PostStore.PostInfo){
      if(allIdPosts[allIdPosts.indexOf(id) + 1] === i.id){
        PostStore.info = i
      }
    }
  }

}

if(GroupStore.usersInGroup[0] !== undefined){
  if (GroupStore.usersInGroup[0].length > 0){
    checkboxes.value = Array(GroupStore.usersInGroup[0].length).fill(true);
  }
}else{
  console.log(checkboxes.value = Array(GroupStore.usersInGroup[0]).fill(true));
}

const pagination = {
  page: 1,
  count: 10
}

async function getFeed() {
  await PostStore.getPosts(pagination, GroupStore.groupId, CourseStore.courseId);
}



const selectAll = () => {
  for (let i in checkboxes.value){
    if(checkboxes.value[i] === true){
      checkboxes.value[i] = false
      shared.value = false
    }
    else{
      checkboxes.value[i] = true
      shared.value = true
    }
  }
};


</script>

<template>
<ion-page>
  <ion-content >
    <v-layout class="mt-4" v-show="PostStore.PostInfo.length > 0">
      <v-card elevation="0"
              class="pa-5 w-75 mx-auto parentGrid d-flex justify-center align-center flex-column-reverse"
              id="parentGrid">

        <ion-grid class="grid_post d-flex justify-center align-center flex-column" id="ionGrid">
          <ion-row v-for="(post, indexRow) in mapPosts()">
            <ion-col v-for="(indexCol, i) in 5" @click="handlePost(indexRow, indexCol)"
                     :style="{ backgroundColor: getPostByCords(indexRow + 1, indexCol)?.color}">
              {{ getPostByCords(indexRow + 1, indexCol)?.id }}
            </ion-col>
          </ion-row>


        </ion-grid>

      </v-card>
    </v-layout>
  </ion-content>

  <ion-footer>
    <div class="text-center">
      <v-bottom-sheet v-model="sheet_read">
        <v-card height="500">
          <div class="d-flex justify-space-around ma-6">
            <div class="left d-flex justify-center align-center">
              <v-btn icon="mdi-arrow-left" elevation="0" @click="lastPost(PostStore.info.id)"></v-btn>
            </div>

            <div class="main d-flex flex-column justify-center align-center">
              <v-card-subtitle>
                {{ PostStore.info.type }}
              </v-card-subtitle>

              <v-card-subtitle>
                {{ PostStore.info.id }}
              </v-card-subtitle>

              <div :style="{backgroundColor: PostStore.info.color}" class="color_post_read">

              </div>

              <v-card-title class="font-weight-bold">
                {{ PostStore.info.title }}
              </v-card-title>

              <v-card-text class="d-flex justify-center flex-column align-center">
                <small>Опис завдання</small>
                {{ PostStore.info.description }}
              </v-card-text>

              <v-card-text>
              </v-card-text>

              <v-card-text class="d-flex justify-center flex-column align-center">
                Оцінка за завдання <i>{{ PostStore.info.points }}</i> <br>

                <div>
                  <v-btn v-show="postShared === false" @click="userSharePost = !userSharePost">
                    Поділитися постом
                  </v-btn>

                </div>
              </v-card-text>
            </div>

            <div class="right d-flex justify-center align-center">
              <v-btn icon="mdi-arrow-right" elevation="0" @click="nextPost(PostStore.info.id)"></v-btn>
            </div>

          </div>
        </v-card>
      </v-bottom-sheet>
    </div>

    <div>
      <v-bottom-sheet fullscreen v-model="userSharePost">
        <v-card>
          <ion-content>
            <div class="mt-6" v-for="i of GroupStore.usersInGroup">
              <div v-for="(j, index) of i">
                <v-list>
                  <v-list-item class="item_student">
                    <div class="content-item-student">
                      <v-list-item-title>
                        {{ j.name }}
                      </v-list-item-title>

                      <v-list-item-subtitle>
                        {{ j.email }}
                      </v-list-item-subtitle>
                    </div>
                    <template v-slot:append >
                      <v-checkbox v-model="checkboxes[index]"></v-checkbox>
                    </template>

                  </v-list-item>
                </v-list>
              </div>
            </div>
          </ion-content>

          <v-btn class="mx-6" color="blue" @click="selectAll()">
            {{shared === true ? "Зняти всі": "Вибрати всі" }}
          </v-btn >
          <v-btn  prepend-icon="mdi-share-all-outline" color="teal-accent-1" class="ma-6"
                 @click="sharePostOpenSheet()">
            Поділитись постом
          </v-btn>
        </v-card>
      </v-bottom-sheet>
    </div>


    <div class="text-center">
      <v-bottom-sheet v-model="dialog" >
        <v-card  >
          <v-card-text>
            <v-card-text class="text-center"><b>{{ PostStore.info.id }}</b></v-card-text>
            <v-text-field
                label="Коментар"
                variant="outlined"
                v-model="sharePostBody.comment"

            >
            </v-text-field>

            <v-text-field
                label="Дата здачі"
                variant="outlined"
                type="datetime-local"
                v-model="sharePostBody.deadline"

            >
            </v-text-field>

            <div class="btnShare">
              <v-btn class="btn_share_post" @click="sharePost()">
                Поділитися
              </v-btn>
            </div>

            <div class="d-flex justify-center ma-6">
              <v-btn color="red"  @click="dialog = false">Закрити</v-btn>
            </div>
          </v-card-text>

        </v-card>
      </v-bottom-sheet>
    </div>
  </ion-footer>
</ion-page>
</template>

<style scoped>
ion-col {
  background-color: #fff;
  outline: 1px solid grey;
  height: 48.5px;
  border-radius: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48.5px;
  margin: 5px;
  outline: none;
}

.btnShare {
  display: flex;
  justify-content: center;
}

.btn_share_post {
  width: 85%;
  background: rgb(85, 255, 216);
  background: linear-gradient(207deg, rgba(85, 255, 216, 1) 16%, rgba(214, 255, 255, 1) 100%);
  outline: 2px cyan ridge;
}
.color_post_read {
  width: 20px;
  height: 20px;
  margin: 10px auto;
  border-radius: 50px;
}

.item_student{
  outline: 1px solid grey;
  margin: 0 10px;
  border-radius: 15px;
}
</style>