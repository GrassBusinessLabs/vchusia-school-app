<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">


    <ion-content>


      <div v-for="value in CourseStore.thisCourse" class="course">
        <div v-for="(name, value, index) in value"
             v-show="value !== 'id' && value !== 'userid' && value !== 'Завдання' && value !== 'Опис курсу'  && value !== 'Ідентифікатор' "
             class="titlesCourse">
          {{ value = nameCourse[index] }} <span class="valueCourse"> {{ name }} </span>
        </div>
      </div>


      <v-layout class="mt-4 mb-4">
        <v-card elevation="3" class="pa-5 w-75 mx-auto bg-indigo-lighten-2">
          Код класу : <b>{{ identifier }}</b>
        </v-card>
      </v-layout>

      <v-card class="pa-5 w-75 mx-auto d-flex flex-column align-center" elevation="1">
        <v-btn class="btn" color="indigo" @click="sheet_change = !sheet_change">
          Редагувати курс
        </v-btn>

        <v-btn class="btn" color="indigo-accent-3" @click="deleteCourse">
          Видалити курс
        </v-btn>



      </v-card>


      <v-layout class="mt-4">
        <v-card elevation="3"
                class="pa-5 w-75 mx-auto parentGrid d-flex justify-center align-center flex-column-reverse"
                id="parentGrid">

          <ion-grid class="grid_post d-flex justify-center align-center flex-column-reverse">
            <ion-row v-model="col" @click="col > 1 ? col = 1 : false">
              <ion-col class="ion-col-post" @click="sheet = !sheet, x(index, col, ion), row = ion" v-for="(ion, index) in 5"></ion-col>
            </ion-row>

            <ion-row @click="col = 1 + ion" v-model="col" v-for="ion in 3">
              <ion-col @click="sheet_parent = !sheet_parent, idPostSelect(), x(index, col, ion), row = ion" v-for="(ion, index) in 5"></ion-col>
            </ion-row>
          </ion-grid>


        </v-card>
      </v-layout>


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
                    prepend-icon="mdi-book-outline"
                    v-model="courseUpdate.name">
                </v-text-field>

                <v-text-field
                    class="input-course"
                    v-model="courseUpdate.discipline"
                    color="primary"
                    label="Назва дисципліни"
                    prepend-icon="mdi-information-outline"

                    variant="outlined">

                </v-text-field>

                <v-text-field
                    class="input-course"
                    v-model="courseUpdate.grade"
                    color="primary"
                    label="Клас"
                    prepend-icon="mdi-google-classroom"
                    variant="outlined">

                </v-text-field>

                <v-text-field
                    class="input-course"
                    v-model="courseUpdate.yearsFrom"
                    color="primary"
                    label="Вік від"
                    prepend-icon="mdi-account-child-outline"
                    variant="outlined">


                </v-text-field>

                <v-text-field
                    class="input-course"
                    v-model="courseUpdate.yearsTo"
                    color="primary"
                    prepend-icon="mdi-human-child"
                    label="Вік до"
                    variant="outlined"
                >
                </v-text-field>


                <v-btn class="btnAddCourse" variant="tonal" color="indigo"
                       @click="updateCourse">
                  Змінити курс
                </v-btn>

              </div>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </div>

      <div class="text-center">


        <v-bottom-sheet v-model="sheet">
          <v-card
              class="text-center"
              height="700"

          >
            <v-card-text>

              <br>
              <br>

              <div>

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

                >
                </v-text-field>

                <v-text-field
                    class="inputTaskStyled"
                    type="datetime-local"
                    variant="outlined"
                    label="Дата здачі"
                    color="primary"
                    prepend-icon="mdi-calendar-range"
                    v-model="task$.deadline"
                >
                </v-text-field>


                <v-btn prepend-icon="mdi-plus-circle" class="btnAddTask" variant="tonal" color="indigo"
                       @click="createPost(), sheet = !sheet ,displayPost = true" v-show="ynShow === true">
                  Додати завдання
                </v-btn>
                <v-card-text class="text-medium-emphasis text-caption text-center" v-show="false">
                  Для редагуваня завдання заповність форму та натисніть на олівець
                </v-card-text>

                <div class="d-flex justify-center align-center w-100">
                  <v-btn @click="deletePost()" icon="mdi-trash-can-outline" class="ma-2" v-show="changeDelBtn === true"></v-btn>

                  <v-btn @click="updatePost()" density="default" icon="mdi-pencil" class="ma-2" v-show="changeDelBtn === true"></v-btn>
                </div>


              </div>
            </v-card-text>
          </v-card>

        </v-bottom-sheet>
      </div>

      <div class="sheet_parent">
        <v-bottom-sheet v-model="sheet_parent" >
          <v-card height="750" class="drawSheetParent">
            <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

            <div class="selectPost">
              <v-select
                  variant="outlined"
                  prepend-icon="mdi-identifier"
                  label="Id"
                  :items=items
                  v-model="task$.parentId"
              ></v-select>
            </div>



            <v-card-text>


              <div>

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


                >
                </v-text-field>

                <v-text-field
                    class="inputTaskStyled"
                    type="datetime-local"
                    variant="outlined"
                    label="Дата здачі"
                    color="primary"
                    prepend-icon="mdi-calendar-range"
                    v-model="task$.deadline"


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
                         @click="sheet_parent = !sheet_parent, createPost()" v-show="ynShow === true">
                    Додати завдання
                  </v-btn>
                </div>

                <v-card-text class="text-medium-emphasis text-caption text-center" v-show="ynShow === false">
                  Для редагуваня завдання заповність форму та натисніть на олівець
                </v-card-text>

                <div class="d-flex justify-center align-center w-100" >
                  <v-btn @click="deletePost()" icon="mdi-trash-can-outline" class="ma-2" v-show="changeDelBtn === true"></v-btn>

                  <v-btn @click="updatePost()" density="default" icon="mdi-pencil" class="ma-2" v-show="changeDelBtn === true"></v-btn>
                </div>

              </div>

            </v-card-text>


          </v-card>
        </v-bottom-sheet>
      </div>
    </ion-footer>


  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonFooter,
  IonCol,
  IonGrid,
  IonMenuButton,
  IonRow,

} from "@ionic/vue";


import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import router from "@/router";
import {course} from "@/stores/course";
import {onMounted, reactive, ref} from "vue";
import {Course} from "@/models/Course";
import {Post} from "@/models/Post";
import {post} from "@/stores/post";
import PostGrid from '/src/components/Teacher/Course/PostGrid.vue';
import {reload} from "ionicons/icons";
import logger from "api/dist/cli/logger";


const CourseStore = course();
const nameCourse = ['id', 'userid', 'Курс', 'Назва курсу', 'Клас', 'Вік від', 'Вік до', 'Опис курсу', 'Завдання', 'Ідентифікатор'];
const identifier = localStorage.getItem('identifier');
const parentGrid = document.querySelector('.parentGrid');
const courseId = localStorage.getItem('courseId');
let row = 1;
let col = 1;
const displayPost = ref(false)
let sheet = ref(false);
let sheet_change = ref(false);
let sheet_parent = ref(false);
const PostStore = post();
let allPost = JSON.parse(localStorage.getItem('allPost'));
let items = []

const idPostSelect = () => {
  PostStore.findPostWithRow()
  for (let i of PostStore.PostInfo){
    items = []
    for (let j of i){
      if (j.column === col - 1)
      items.push(j.id)
    }
  }
  console.log(items)
}
let ynShow = true
let changeDelBtn = true


let courseUpdate = reactive({
  name: "",
  discipline: "",
  grade: null,
  yearsFrom: null,
  yearsTo: null,

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
  color: ""
})

let arrCol = []
let idPost;
const x = (index, col, ion) => {
  // col = ion + 1;

  let cols = document.querySelectorAll('ion-row')
  let rows = document.querySelectorAll('ion-col')

  for (let i of cols){
    arrCol.push(i)
  }

  let g = arrCol[col - 1]
  let t = g.querySelectorAll('ion-col')
  idPost = t[index].textContent
  console.log(t[index].textContent)
  console.log(t[index].textContent.length)
  console.log(t[index])
  localStorage.setItem('idPost', idPost)

  if(t[index].textContent.length > 0){
    console.log(true)
    ynShow = false
    changeDelBtn = true

  } else{
    ynShow = true
    changeDelBtn = false
    console.log(false)
  }
}




async function createPost() {

  async function locationRow() {
    let rows = document.querySelectorAll('ion-row')
    let cols = document.querySelectorAll('ion-col')


    const x = (cols, rows) => {
      const post: any = JSON.parse(localStorage.getItem('post'));
      let clickedRow = rows[col - 1]
      let y = clickedRow.querySelectorAll('ion-col')
      let neededCol = y[row - 1]
      neededCol.innerText = post.id
      console.log(task$.color)
      neededCol.style.background = task$.color
      neededCol.style.outline = 'none';
      console.log(neededCol)

      //InnerHTML for ion-grid, ion-row, ion-col
    }
    x(cols, rows)
  }

  const body: Post = {
    title: task$.title,
    description: task$.description,
    answer: task$.answer,
    points: +task$.points,
    deadline: new Date(task$.deadline).toISOString(),
    parentId: Number(task$.parentId),
    requiredPoints: task$.requiredPoints,
    row: row,
    column: col,
    color: task$.color,
    type: "string"
  }

    task$.answer = "";
    task$.title = "";
    task$.description = "";
    task$.deadline = "";

  PostStore.createPost(body);
  locationRow()


}

const updateCourse = () => {
  const changedCourse: Course = {
    name: courseUpdate.name,
    discipline: courseUpdate.discipline,
    grade: +courseUpdate.grade,
    yearsFrom: +courseUpdate.yearsFrom,
    yearsTo: +courseUpdate.yearsTo
  }

  CourseStore.updateCourse(changedCourse)

  courseUpdate.name = "";
  courseUpdate.discipline = "";
  courseUpdate.grade = null;
  courseUpdate.yearsFrom = null;
  courseUpdate.yearsTo = null;
  location.reload();
}

const deletePost = () => {
  PostStore.deletePost()
}

const updatePost = () => {
  const body: UpdatePost = {
    title: task$.title,
    description: task$.description,
    answer: task$.answer,
    points: +task$.points,
    deadline: new Date(task$.deadline).toISOString(),
    requiredPoints: task$.requiredPoints,
  }

  PostStore.updatePost(body)
}


const locatedPost = () => {
  PostStore.findPostWithRow()
  for (let i of PostStore.PostInfo){
    console.log(i)
    for (let v of i){
      console.log(v)
    }
  }


  let m = allPost.items
  for (let g of m){
    console.log(g.column, g.row)
    if (g.column || g.row in g){
      console.log(g.id)
      let rows = document.querySelectorAll('ion-row')
      let cols = document.querySelectorAll('ion-col')
      let y = rows[g.column - 1]
      let h = y.querySelectorAll('ion-col')
      let needCord = h[g.row - 1]
      needCord.innerText = g.id

      console.log(needCord)
      needCord.style.background = g.color
    }
  }


}

const deleteCourse = () => {
  CourseStore.deleteCourse()
  router.replace('/main/courses')
}

const loadCourse = () => {
  CourseStore.findCourseById()
}

loadCourse();
onMounted(() => locatedPost())
</script>

<style scoped>
.course {
  text-align: center;
  padding: 15px;
  width: 80%;
  margin: 15px auto;
  color: #fff;
  background: rgb(0, 75, 171);
  background: url(https://www.eastsidefunding.com/wp-content/uploads/2016/08/counters-bg-image.jpg);
  border-radius: 15px;
}

.titlesCourse {
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.btn {
  margin: 10px 0;
  width: 90%;
  border-radius: 15px;
}

.valueCourse {
  color: #9ae6c4;
  font-size: 18px;
  font-family: "Fira Code Medium", monospace;
}

.layout-footer {
  max-height: 10vh;
}

.grid_post {
  width: 100%;
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

.selectPost{
  margin: 15px 25px 0 25px;
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
</style>