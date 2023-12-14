<script setup lang="ts">
import {IonCol, IonGrid, IonPage, IonRow, IonContent, IonFooter, IonHeader} from "@ionic/vue";
import {course} from "@/stores/course";
import {post} from "@/stores/post"
import {ref} from "vue";
import {group} from "@/stores/group";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import router from "@/router";

const CourseStore = course()
const PostStore = post()
const GroupStore = group()
const sheet_read = ref(false)
const courseInfo = CourseStore.thisCourse
let items = []
let r, c;
const switchMode = ref(true)
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

const getPostByCords = (row : any, column : any) => {
  return PostStore.PostInfo.find(post => post.row === row && post.column === column)
}

const handlePost = (row : any, column : any) => {

  let idPost
  if(getPostByCords(row + 1, column)) {

    if (switchMode.value === true) {
      sheet_read.value = true

      for (let i of PostStore.PostInfo) {
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
  // } else{
  //   items = []
  //   // for (let i of PostStore.PostInfo){
  //   //   if(i.row === row){
  //   //     items.push(i.id)
  //   //   }
  //   // }
  //   // r = row + 1;
  //   // c = column
  //   // console.log(row + 1, column)
  //   // console.log('create')
  //
  // }
  return idPost, r, c, items

}

const deleteCourseFromGroup = (courseId: any) => {
  GroupStore.removeCourseFromGroup(GroupStore.idGroup, courseId)
}

PostStore.findPostWithRowGroupCourse()
</script>

<template>
<ion-page>
<ion-header>
  <div class="course">
    <p>Курс <span> {{courseInfo.name}}</span></p>
    <p>Назва <span>{{courseInfo.discipline}}</span></p>
    <p>Клас <span>{{courseInfo.grade}}</span></p>
    <p>Вік від <span>{{courseInfo.yearsFrom}}</span></p>
    <p>Вік до <span>{{courseInfo.yearsTo}}</span></p>
  </div>
</ion-header>

  <div class="d-flex justify-center mb-6">
    <v-btn color="red" @click="deleteCourseFromGroup(CourseStore.thisCourse.id) ">
      Видалити курс
    </v-btn>
  </div>

  <ion-content>
    <v-layout>
        <ion-grid class="grid_post d-flex justify-center align-center flex-column-reverse" id="ionGrid" >
          <p v-show="PostStore.PostInfo.length < 1">Постів не знайдено</p>
          <ion-row v-for="(post, indexRow) in mapPosts()">
            <ion-col v-for="(indexCol, i) in 5" @click="handlePost(indexRow, indexCol)" :style="{ backgroundColor: getPostByCords(indexRow + 1, indexCol)?.color}">{{getPostByCords(indexRow + 1, indexCol)?.id}}</ion-col>
          </ion-row>
        </ion-grid>
    </v-layout>

  </ion-content>

  <ion-footer>
    <div class="text-center">
      <v-bottom-sheet v-model="sheet_read" >
        <v-card height="500" :subtitle="PostStore.info.type" class="text-center" >
          <v-card-subtitle>
            {{PostStore.info.id}}
            <div class="color_post_read" :style="{backgroundColor: PostStore.info.color}"></div>
          </v-card-subtitle>
          <v-card-title class="font-weight-bold" >
            {{PostStore.info.title}}
          </v-card-title>


          <v-card-text class="d-flex justify-center flex-column align-center">
            <small>Опис завдання</small>
            {{PostStore.info.description}}
          </v-card-text>

          <v-card-text>
          </v-card-text>

          <v-card-text>
            Оцінка за завдання <i>{{PostStore.info.points}}</i> <br>

          </v-card-text>


        </v-card>
      </v-bottom-sheet>
    </div>
  </ion-footer>

</ion-page>
</template>

<style scoped>
.course {
  text-align: center;
  padding: 15px;
  width: 80%;
  margin: 15px auto;
  color: gray;
  background: rgb(223,226,216);
  background: linear-gradient(110deg, rgba(223,226,216,1) 0%, rgba(225,255,249,1) 100%);
  border-radius: 15px;
  outline: cyan 1px ridge;

}


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

.grid_post {
  width: 100%;
}
</style>