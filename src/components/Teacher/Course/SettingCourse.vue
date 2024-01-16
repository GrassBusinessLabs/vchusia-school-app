<script setup lang="ts">
import {IonPage, IonHeader, IonContent, IonFooter, IonCol, IonGrid, IonRow} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {reactive, ref} from "vue";
import {course} from "@/stores/course";
import {Course} from "@/models/Course";
import router from "@/router";
import {post} from "@/stores/post"
import {Post, sharePost, UpdatePost} from "@/models/Post";
import {group} from "@/stores/group";

const sheet_parent = ref(false)
let items: any = []
const courseId = localStorage.getItem('courseId');

let r, c: any;
const GroupStore = group()
const sheet_change_post = ref(false)
const PostStore = post()
const CourseStore = course()
const sheet_change = ref(false);
let infoCourseStore: any
const dialog = ref(false)
for(let i of CourseStore.thisCourse){
  infoCourseStore = i
}


let infoCourse = reactive({
  name: infoCourseStore.name,
  discipline: infoCourseStore.discipline,
  grade: infoCourseStore.grade,
  yearsFrom: infoCourseStore.yearsFrom,
  yearsTo: infoCourseStore.yearsTo
})

let typePost = reactive({
  type: {
    type: 'Post', name: 'Пост'
  }
})
PostStore.PostInfo = [];


let task$ = reactive({
  courseId: Number(courseId),
  title: "",
  description: "",
  answer: "",
  points: 10,
  deadline: "",
  parentId: 0,
  requiredPoints: 0,
  color: "",
  type: typePost.type.type
})

const updateCourse = () => {
  const changedCourse: Course = {
    name: infoCourse.name,
    discipline: infoCourse.discipline,
    grade: +infoCourse.grade,
    yearsFrom: +infoCourse.yearsFrom,
    yearsTo: +infoCourse.yearsTo
  }

  CourseStore.updateCourse(changedCourse)

  sheet_change.value = false
}

async function createPost() {
  const body: Post = {
    title: task$.title,
    description: task$.description,
    answer: task$.answer,
    points: +task$.points,
    parentId: Number(task$.parentId),
    requiredPoints: task$.requiredPoints,
    row: r,
    column: c,
    color: task$.color,
    type: task$.type
  }

  task$.answer = "";
  task$.title = "";
  task$.description = "";
  task$.deadline = "";


  PostStore.createPost(body);

}

const getPostByCords = (row : any, column : any) => {
  return PostStore.PostInfo.find(post => post.row === row && post.column === column)
}

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

const handlePost = (row : any, column : any) => {

  let idPost
  if(getPostByCords(row + 1, column)){

      for (let i of PostStore.PostInfo){
        if(row + 1 === i.row && column === i.column){
          console.log(i.id)
          idPost = i.id
          PostStore.idPostsNow = i.id
          PostStore.info = i
        }
      }

      GroupStore.allGroups = []
      sheet_change_post.value = true
      GroupStore.getCreatedGroupsList()

      console.log('edit create')
      for (let i of PostStore.PostInfo){
        if(row + 1 === i.row && column === i.column){
          console.log(i.id)
          idPost = i.id
          PostStore.idPostsNow = i.id
          PostStore.info = i
        }

    }




  } else{
    items = []
    task$.parentId = null;
    for (let i of PostStore.PostInfo){
      if(i.row === row){
        items.push(i.id)
      }
    }
    sheet_parent.value = true
    r = row + 1;
    c = column
    console.log(row + 1, column)
    console.log('create')

  }
  return idPost, r, c, items

}

const createNewPost = (column) => {
  const rows = PostStore.PostInfo.map(post => post.row)
  const uniqueSet = Array.from(new Set(rows))
  console.log(Math.max(...uniqueSet) + 1)
  console.log(rows)
  if (rows.length === 0){
    r = 1
  } else{
    items = []
    r = Math.max(...uniqueSet) + 1;
    for (let i of PostStore.PostInfo){
      if(i.row === r - 1){
        items.push(i.id)
      }
    }
  }
  c = column
  return r, c
}

const updatePost = () => {
  const body: UpdatePost = {
    title: PostStore.info.title,
    description: PostStore.info.description,
    answer: PostStore.info.answer,
    points: +PostStore.info.points,
    requiredPoints: PostStore.info.requiredPoints,
    type: PostStore.info.type,
    color: PostStore.info.color
  }

  PostStore.updatePost(body)
  sheet_change_post.value = false
}

const deleteCourse = () => {
  CourseStore.deleteCourse()
  router.replace('/main/courses')
}

const deletePost = () => {
  PostStore.deletePost()
  sheet_change_post.value = false
}
PostStore.findPostWithRow()

</script>

<template>
<ion-page>

<ion-header>

</ion-header>

  <ion-content>
    <v-layout class="mt-4">
      <v-card elevation="0"
              class="pa-5 w-75 mx-auto parentGrid d-flex justify-center align-center flex-column-reverse"
              id="parentGrid">

        <ion-grid class="grid_post d-flex justify-center align-center flex-column" id="ionGrid" >
          <ion-row v-for="(post, indexRow) in mapPosts()">
            <ion-col v-for="(indexCol, i) in 5" @click="handlePost(indexRow, indexCol)" :style="{ backgroundColor: getPostByCords(indexRow + 1, indexCol)?.color}">{{getPostByCords(indexRow + 1, indexCol)?.id}}</ion-col>
          </ion-row>

          <ion-row >
            <ion-col class="ion-col-post" @click="createNewPost(indexCol), sheet_parent = !sheet_parent" v-for="(indexCol, index) in 5" ></ion-col>
          </ion-row>

        </ion-grid>


      </v-card>
    </v-layout>

    <v-card class="pa-5 w-75 mx-auto d-flex flex-column align-center ma-6" elevation="0">
      <v-btn class="btn" color="teal-darken-2" @click="sheet_change = !sheet_change">
        Редагувати курс
      </v-btn>

      <v-btn class="btn" color="red" @click="dialog = !dialog">
        Видалити курс
      </v-btn>

      <v-dialog v-model="dialog">
        <v-card height="200" class="d-flex justify-center align-center">

          <div class="content_dialog_delete">
            <v-card-text>
              <p>Ви бажаєте видалити курс?</p>
            </v-card-text>

            <v-btn class="btn_delete_course ma-2" @click="deleteCourse()" color="red" prepend-icon="mdi-delete-outline">
              Видалити
            </v-btn>
            <v-btn class="btn_cancel_delete ma-2" @click="dialog = false" prepend-icon="mdi-close" color="cyan">
              Відмінити
            </v-btn>
          </div>

        </v-card>
      </v-dialog>
    </v-card>
  </ion-content>


  <ion-footer>
    <div class="text-center">
      <v-bottom-sheet v-model="sheet_change">
        <v-card
            class="text-center"
            height="700"
        >
          <v-card-text>
            <br>
            <br>
            <div>
              <v-text-field
                  class="input-course"
                  color="primary"
                  label="Назва курсу"
                  variant="outlined"
                  v-model="infoCourse.name"
                  prepend-icon="mdi-book-outline">

              </v-text-field>

              <v-text-field
                  class="input-course"
                  color="primary"
                  label="Назва дисципліни"
                  prepend-icon="mdi-information-outline"
                  v-model="infoCourse.discipline"
                  variant="outlined">

              </v-text-field>

              <v-text-field
                  class="input-course"
                  color="primary"
                  label="Клас"
                  v-model="infoCourse.grade"
                  prepend-icon="mdi-google-classroom"
                  variant="outlined">

              </v-text-field>

              <v-text-field
                  class="input-course"
                  color="primary"
                  label="Вік від"
                  v-model="infoCourse.yearsFrom"
                  prepend-icon="mdi-account-child-outline"
                  variant="outlined">


              </v-text-field>

              <v-text-field
                  class="input-course"
                  color="primary"
                  v-model="infoCourse.yearsTo"
                  prepend-icon="mdi-human-child"
                  label="Вік до"
                  variant="outlined"
              >
              </v-text-field>


              <v-btn class="btnAddCourse" variant="tonal" color="indigo" prepend-icon="mdi-content-save" @click="updateCourse()">
                Зберегти
              </v-btn>

            </div>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </div>


    <div class="sheet_parent">
      <v-bottom-sheet v-model="sheet_parent">
        <v-card height="750" class="drawSheetParent">
          <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

          <div class="selectPost">
            <v-select
                v-show="r > 1"
                variant="outlined"
                prepend-icon="mdi-identifier"
                label="Id"
                :items=items
                v-model="task$.parentId"
            ></v-select>
          </div>



          <v-card-text>


            <div>

              <v-select
                  label="Тип"
                  :items="[{type: 'Post', name: 'Пост'}, {type: 'Task', name: 'Завдання'}]"
                  item-title="type"
                  variant="outlined"
                  color="primary"
                  v-model="task$.type"
                  prepend-icon="mdi-file-tree"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props" :subtitle="item.raw.name"></v-list-item>
                </template>
              </v-select>

              <v-text-field
                  class="inputTaskStyled"
                  variant="outlined"
                  label="Заголовок"
                  prepend-icon="mdi-bookmark-outline"
                  color="primary"
                  v-model="task$.title"


              >
              </v-text-field>

              <v-text-field
                  class="inputTaskStyled"
                  variant="outlined"
                  label="Опис завдання"
                  color="primary"
                  prepend-icon="mdi-information-outline"
                  v-model="task$.description"



              >
              </v-text-field>

              <v-text-field
                  class="inputTaskStyled"
                  variant="outlined"
                  label="Відповідь"
                  color="primary"
                  prepend-icon="mdi-forum"
                  v-model="task$.answer"
                  v-show="task$.type === 'Task'"


              >
              </v-text-field>

              <v-text-field
                  class="inputTaskStyled"
                  type="number"
                  variant="outlined"
                  label="Кількість балів"
                  color="primary"
                  prepend-icon="mdi-star"
                  v-model="task$.points"
                  v-show="task$.type === 'Task'"



              >
              </v-text-field>

              <v-select
                  :items="['blue', 'red', 'yellow', 'green']"
                  variant="outlined"
                  label="Колір завдання"
                  density="compact"
                  prepend-icon="mdi-palette"
                  v-model="task$.color"
              ></v-select>

              <div class="btnAddPostParent">
                <v-btn prepend-icon="mdi-plus-circle" class="btnAddTaskParent" id="btnAddTask" variant="tonal" color="indigo"
                       @click="sheet_parent = !sheet_parent, createPost()">
                  Додати завдання
                </v-btn>
              </div>

            </div>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </div>

    <div class="text-center d-flex">
      <v-bottom-sheet v-model="sheet_change_post">
        <v-card height="750" >

          <v-card-text>

            <v-select
                label="Тип"
                :items="[{type: 'Post', name: 'Пост'}, {type: 'Task', name: 'Завдання'}]"
                item-title="type"
                variant="outlined"
                color="primary"
                v-model="PostStore.info.type"
                prepend-icon="mdi-file-tree"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item v-bind="props" :subtitle="item.raw.name"></v-list-item>
              </template>
            </v-select>

            <v-text-field
                class="inputTaskStyled"
                variant="outlined"
                label="Заголовок"
                prepend-icon="mdi-bookmark-outline"
                color="primary"
                v-model="PostStore.info.title"
            >
            </v-text-field>

            <v-text-field
                class="inputTaskStyled"
                variant="outlined"
                label="Опис завдання"
                color="primary"
                prepend-icon="mdi-information-outline"
                v-model="PostStore.info.description"



            >
            </v-text-field>

            <v-text-field
                class="inputTaskStyled"
                variant="outlined"
                label="Відповідь"
                color="primary"
                prepend-icon="mdi-forum"
                v-model="PostStore.info.answer"


            >
            </v-text-field>

            <v-text-field
                class="inputTaskStyled"
                type="number"
                variant="outlined"
                label="Кількість балів"
                color="primary"
                prepend-icon="mdi-star"
                v-model="PostStore.info.points"


            >
            </v-text-field>

            <v-select
                :items="['blue', 'red', 'yellow', 'green']"
                variant="outlined"
                label="Колір завдання"
                density="compact"
                prepend-icon="mdi-palette"
                v-model="PostStore.info.color"
            ></v-select>

            <div class="btn_changes_post">
              <v-btn class="btn_change_post" color="#9C27B0" @click="updatePost()">
                Зберегти
              </v-btn>

              <v-btn class="btn_del_post" color="#F44336" @click="deletePost()">
                Видалити
              </v-btn>

            </div>

          </v-card-text>



        </v-card>
      </v-bottom-sheet>
    </div>

  </ion-footer>
</ion-page>
</template>

<style scoped>
.btn {
  margin: 10px 0;
  width: 90%;
  border-radius: 15px;
}

.content_dialog_delete{
  display: flex;
  flex-direction: column;
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
  overflow: hidden;
}

.btnAddTaskParent{
  display: flex;
  justify-content: center;

}
.btnAddPostParent{
  display: flex;
  justify-content: center;
  align-items: center;
}
.selectPost{
  margin: 15px 25px 0 25px;
}

.btn_changes_post{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.btn_change_post, .btn_del_post{
  width: 80%;
  margin: 10px;
  color: #fff;
}
</style>