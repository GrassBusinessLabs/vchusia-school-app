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

          <ion-grid class="grid_post d-flex justify-center align-center flex-column-reverse" id="ionGrid" >
<!--            <ion-row v-model="col" @click="col > 1 ? col = 1 : false" style="background: grey">-->
<!--              <ion-col class="ion-col-post" @click="sheet = !sheet, x(index, col, ion), row = ion" v-for="(ion, index) in 5"></ion-col>-->
<!--            </ion-row>-->

            <ion-row v-for="(post, indexRow) in mapPosts()">
              <ion-col v-for="(indexCol, i) in 5" @click="handlePost(indexRow, indexCol)" :style="{ backgroundColor: getPostByCords(indexRow + 1, indexCol)?.color}">{{getPostByCords(indexRow + 1, indexCol)?.id}}</ion-col>
            </ion-row>

            <ion-row>
              <ion-col class="ion-col-post" @click="createNewPost(indexCol), sheet_parent = !sheet_parent" v-for="(indexCol, index) in 5" ></ion-col>
            </ion-row>
<!--            <ion-row @click="col = 1 + ion" v-model="col" v-for="ion in 3" v-if="PostStore.PostInfo !== null">-->
<!--              <ion-col @click="sheet_parent = !sheet_parent, idPostSelect(), x(index, col, ion), row = ion" v-for="(ion, index) in 5"></ion-col>-->
<!--            </ion-row>-->


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


      <div class="text-center d-flex">
        <v-bottom-sheet v-model="sheet_change_post">
          <v-card height="750" >

            <v-card-text>
              <v-select
                  label="Тип завдання"
                  :items="['Пост', 'Завдання']"
                  variant="outlined"
                  color="primary"
                  v-model="PostStore.info.type"
                  prepend-icon="mdi-file-tree"
              >

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
                  v-model="PostStore.info.color"
              ></v-select>

              <div class="btn_changes_post">
                <v-btn class="btn_change_post" color="#9C27B0" @click="updatePost()">
                  Редагувати
                </v-btn>

                <v-btn class="btn_del_post" color="#F44336" @click="deletePost()">
                  Видалити
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
                  v-show="r % 2 == 0"
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
                    label="Тип завдання"
                    :items="['Пост', 'Завдання']"
                    variant="outlined"
                    color="primary"
                    v-model="task$.type"
                    prepend-icon="mdi-file-tree"
                >

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
                    v-show="task$.type === 'Завдання'"


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
                    v-show="task$.type === 'Завдання'"


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
                         @click="sheet_parent = !sheet_parent, createPost()">
                    Додати завдання
                  </v-btn>
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
const displayPost = ref(false)
let sheet_change_post = ref(false)
let sheet = ref(false);
let r, c;
let sheet_change = ref(false);
let sheet_parent = ref(false);
const PostStore = post();
let allPost = JSON.parse(localStorage.getItem('allPost'));
let items = []


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
  color: "",
  type: ""
})

async function createPost() {
  const body: Post = {
    title: task$.title,
    description: task$.description,
    answer: task$.answer,
    points: +task$.points,
    deadline: new Date(task$.deadline).toISOString(),
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

}

const deletePost = () => {
  PostStore.deletePost()
  sheet_change_post.value = false
}

const updatePost = () => {
  const body: UpdatePost = {
    title: PostStore.info.title,
    description: PostStore.info.description,
    answer: PostStore.info.answer,
    points: +PostStore.info.points,
    deadline: new Date(task$.deadline).toISOString(),
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

const loadCourse = () => {
  console.log(CourseStore.findCourseById())
}

const getPostByCords = (row, column) => {
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

const handlePost = (row, column) => {
  let idPost
  if(getPostByCords(row + 1, column)){
    //sheet open
    sheet_change_post.value = true
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
    sheet_parent.value = true
    r = row + 1;
    c = column
    console.log(row + 1, column)
    console.log('create')
  }
  return idPost, r, c

}

const createNewPost = (column) => {
  const rows = PostStore.PostInfo.map(post => post.row)
  const uniqueSet = Array.from(new Set(rows))
  console.log(Math.max(...uniqueSet) + 1)
  console.log(rows)
  if (rows.length === 0){
    r = 1
  } else{
    r = Math.max(...uniqueSet) + 1;
  }
  c = column
  return r, c
}

loadCourse();
PostStore.findPostWithRow()
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