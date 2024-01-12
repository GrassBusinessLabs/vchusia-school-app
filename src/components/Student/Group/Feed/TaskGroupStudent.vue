<script setup lang="ts">
import {IonHeader, IonPage, IonContent, IonCol, IonGrid, IonRow, onIonViewWillEnter, IonFooter} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {course} from "@/stores/course";
import {group} from "@/stores/group";
import {post} from "@/stores/post"
import {onMounted, reactive, ref} from "vue";
import CropperComponent from "@/components/parts/CropperComponent.vue";
import {solution} from "@/stores/solution";

const readPost = ref(false)
const CourseStore = course()
const PostStore = post()
const GroupStore = group()
const SolutionStore = solution()
const sheet_read = ref(false)
const courseInfo = CourseStore.thisCourse
let items = []
let r, c;
const switchMode = ref(true)
const sharedValue = ref(false)
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


const getPostByCords = (row, column) => {
  const postInTask = PostStore.postsInTask.find(post => post.row === row && post.column === column);
  const postInfo = PostStore.PostInfo.find(post => post.row === row && post.column === column);

  if (postInTask && postInfo && postInTask.id === postInfo.id) {
    postInfo.color = 'grey';

  }

  return postInfo;
};


const postShared = ref(false)

const handlePost = (row: any, column: any) => {

  let idPost
  if (getPostByCords(row + 1, column)) {

    if (switchMode.value === true) {
      readPost.value = true
      for (let i of PostStore.PostInfo) {
        if (row + 1 === i.row && column === i.column) {
          postShared.value = false
          console.log(i.id)
          if (i.color === 'grey'){
            sharedValue.value = true
            for(let k of PostStore.postsInTask){
              if(k.id === i.id){
                PostStore.sharedPostInfo = k
              }
            }
          } else{
            sharedValue.value = false
          }
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

const formatDate = (dateString: any) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // 24-hour format
  };

  const formattedDate = new Date(dateString).toLocaleString('ua-UA', options);
  return formattedDate;
};

function isFutureDate(targetDate: any) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  return targetDateTime > currentDate;
}

const solutionDescription = reactive({
  description: ''
})

//Solution requests
const saveSolution = () => {
  SolutionStore.saveSolution(solutionDescription)
}
const attachImageFunc = () => {
  SolutionStore.attachImage()
}

const updateStatus = () => {
  SolutionStore.updateStatus(2)
}
const updateSolution = () => {
  const body = {
    description: "222"
  }
  SolutionStore.updateSolution(body, 2)
}
const deleteSolution = () => {
  SolutionStore.deleteSolution(2)
}
const deleteImage = () => {
  SolutionStore.deleteImage(2)
}

const findSolutionById = () => {
  SolutionStore.findSolutionById(2)
}

onMounted(() => {PostStore.findPostWithRow()})
</script>

<template>
<ion-page>

  <ion-content>
    <div v-for="course of CourseStore.courseInGroup" class="course_parent_block">
      <div v-if="CourseStore.courseId === course.id" class="course">
        <div class="description_course">
          <span class="content_text_course title_course">{{course.name}}</span>
          <span class="content_text_course title_discipline">{{course.discipline}}</span>
          <div class="years d-flex justify-space-between align-center">
            <div class="years-from">
              <span class="content_text_course">{{ course.yearsFrom }}</span>
            </div>
            -
            <div class="years-to">
              <span class="content_text_course">{{ course.yearsTo }}</span>
            </div>
          </div>
          <p class="years_text_label">років</p>

        </div>


        <div class="d-flex justify-center align-center">
          <div class="d-flex align-center flex-column justify-center">
            <div class="grade_text">
              <p>{{ course.grade }}</p>
              <small>клас</small>
            </div>


          </div>
        </div>


      </div>

    </div>
    <v-layout class="mt-4">
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
      <v-bottom-sheet v-model="readPost">
        <v-card height="550">
          <div class="d-flex flex-column justify-center align-center mt-9">
            <div class="container">
              <div class="d-flex justify-space-between">
                <div class="pa-2">
                  <v-card-subtitle class="pa-2 d-flex flex-column justify-center align-center">{{ PostStore.info.id }}</v-card-subtitle>
                  <div :style="{backgroundColor: PostStore.info.color}" class="color_post_read"></div>
                </div>

                <div>
                  <v-card-title class="font-weight-bold">{{ PostStore.info.title }}</v-card-title>
                  <v-card-subtitle>Виконати до: {{formatDate(PostStore.info.deadline)}}</v-card-subtitle>
                  <v-card-subtitle class="missingDate" v-if="isFutureDate(PostStore.info.deadline) === false"> Пропущено термін здачі </v-card-subtitle>
                  <v-card-subtitle>Оцінка за завдання {{ PostStore.info.points }}</v-card-subtitle>
                </div>
              </div>

              <v-card-text class="description-post">
                <p>{{ PostStore.info.description }}</p>
              </v-card-text>



            </div>
            <div class="buttons_post_card">
              <v-btn class="btn_share" v-if="sharedValue === false">
                Поширити завдання
              </v-btn>
              <v-btn class="btn_replace" v-else-if="sharedValue === true" @click="$router.replace('/group-info-student/post')">
                Перейти до завдання
              </v-btn>
            </div>

          </div>



        </v-card>
      </v-bottom-sheet>
    </div>
  </ion-footer>


</ion-page>
</template>

<style scoped>
.course_parent_block{
  margin: 15px;
}
.course{
  display: flex;
  align-items: start;
  outline: 1px solid #6a64ff;
  padding: 15px 15px 0 15px;
  justify-content: space-around;
  border-radius: 15px;
  background: #62ceff;
  height: 20vh;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: self-start;
  text-align: left;
  width: 90%;
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

.color_post_read {
  width: 20px;
  height: 20px;
  margin: 10px 15px;
  border-radius: 50px;
}
.fileInputBlock, .acceptTaskBlock{
  width: 100%;
  margin: 20px auto 0 auto;
}

.acceptTaskBlock{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnAcceptTask{
  width: 80%;
  background: #4CAF50;
  color: #fff;
}

.description-post{
  outline: 1px solid #dbdbdb;
  width: 90%;
  border-radius: 15px;
  min-height: 20vh;
  margin: 10px auto;
}

.content_text_course{
  font-family: 'Single Day', cursive;
  font-weight: 700;
  font-size: 20px;
}

.grade_text{
  outline: 1px solid #fff;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50% 20% / 10% 40%;
  background: rgb(98,230,255);
  background: linear-gradient(96deg, rgba(98,230,255,1) 0%, rgba(255,250,204,1) 100%);
  flex-direction: column;
  font-family: 'Single Day', cursive;
  font-weight: 700;
  color: #878787;
}

.missingDate{
  color: red;
  font-weight: 900;
  text-align: right;
}

.years{
  margin-top: 10px;
}

.years-from{
  background: #fff;
  border-radius: 30%;
  padding: 5px;
}
.years-to{
  background: #fff;
  border-radius: 30%;
  padding: 5px;
}
.years_text_label{
  color: #fff;
  flex-direction: column;
  font-family: 'Single Day', cursive;
  text-transform: uppercase;

}
.description_course{
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}
.title_course{
  font-size: 35px;
  color: lightcoral;

}
.buttons_post_card{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 0 auto;
}
.btn_share, .btn_replace{
  width: 90%;
  margin: 10px auto;
}
.btn_share{
  background: aliceblue;
}
.btn_replace{
  background: antiquewhite;
}
</style>