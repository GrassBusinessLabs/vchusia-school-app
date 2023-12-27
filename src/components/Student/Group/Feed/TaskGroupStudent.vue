<script setup lang="ts">
import {IonHeader, IonPage, IonContent, IonCol, IonGrid, IonRow, onIonViewWillEnter} from "@ionic/vue";
import {course} from "@/stores/course";
import {group} from "@/stores/group";
import {post} from "@/stores/post"
import {ref} from "vue";
import Post from "@/http/modules/post";
import logger from "api/dist/cli/logger";

const CourseStore = course()
const PostStore = post()
const GroupStore = group()
const sheet_read = ref(false)
const courseInfo = CourseStore.thisCourse
let items = []
let r, c;
const switchMode = ref(true)

const getPostByCords = (row: any, column: any) => {
  return PostStore.feedPosts.find(post => post.row === row && post.column === column)
}
// const mapPosts = () => {
//   const rows = PostStore.PostInfo.map(post => post.row)
//   const uniqueSet = Array.from(new Set(rows))
//   const mappedUniqueSet = uniqueSet.map(row => {
//     return {
//       row: row,
//       groups: PostStore.feedPosts.filter(item => item.row === row)
//     }
//   })
//   return mappedUniqueSet
// }

const maxRow = () => {
  const arrMaxRow = PostStore.feedPosts.map(post => post.row);
  PostStore.rows = Math.max(...arrMaxRow);
}
onIonViewWillEnter(() => {
  maxRow()
})


const handlePost = (row : any, column : any) => {

  let idPost
  if (getPostByCords(row + 1, column)) {

    if (switchMode.value === true) {
      sheet_read.value = true

      for (let i of PostStore.feedPosts) {
        if (row + 1 === i.row && column === i.column) {

          console.log(i.id)
          idPost = i.id
          PostStore.idPostsNow = i.id
          PostStore.info = i
        }
      }
    } else {
      GroupStore.allGroups = []
      GroupStore.getCreatedGroupsList()

      console.log('edit create')
      for (let i of PostStore.feedPosts) {
        if (row + 1 === i.row && column === i.column) {
          console.log(i.id)
          idPost = i.id
          PostStore.idPostsNow = i.id
          PostStore.info = i
        }
      }
    }


  } else {
    items = []
    for (let i of PostStore.PostInfo) {
      if (i.row === row) {
        items.push(i.id)
      }
    }
    r = row + 1;
    c = column
    console.log(row + 1, column)
    console.log('create')

  }
  return idPost, r, c, items

}



</script>

<template>
<ion-page>
  <ion-header>
    <div v-for="course of CourseStore.courseInGroup" class="course_parent_block">
      <div v-if="CourseStore.courseId === course.id" class="course">
        <p>Назва курсу: {{course.name}}</p>
        <p>Дисципліна: {{course.discipline}}</p>
        <p>Клас: {{ course.grade }}</p>
        <p>Вік від: {{ course.yearsFrom }}</p>
        <p>Вік до: {{ course.yearsTo }}</p>
      </div>
    </div>
  </ion-header>

  <ion-content>
    <v-layout class="mt-4" v-show="PostStore.feedPosts.length > 0">
      <v-card elevation="0"
              class="pa-5 w-75 mx-auto parentGrid d-flex justify-center align-center flex-column-reverse"
              id="parentGrid">

        <ion-grid class="grid_post d-flex justify-center align-center flex-column" id="ionGrid">
          <ion-row v-for="(post, indexRow) in PostStore.rows">
            <ion-col v-for="(indexCol, i) in 5" @click="handlePost(indexRow, indexCol)"
                     :style="{ backgroundColor: getPostByCords(indexRow + 1, indexCol)?.color}">
              {{ getPostByCords(indexRow + 1, indexCol)?.id }}
            </ion-col>
          </ion-row>
        </ion-grid>

      </v-card>
    </v-layout>
  </ion-content>


</ion-page>
</template>

<style scoped>
.course_parent_block{
  margin: 15px;
}
.course{
  display: flex;
  flex-direction: column;
  outline: 1px solid #6a64ff;
  padding: 10px;
  border-radius: 15px;
  background: #62ceff;
}

ion-col{
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
</style>