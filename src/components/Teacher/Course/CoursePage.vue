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

  <v-btn @click="locatedPost()">
    H
  </v-btn>
        <div class="outputPost"  v-for="(value, index) in PostStore.PostInfo">
          <div v-for="(i, index) in value">{{index}}:{{i.id}} </div>
        </div>

      </v-card>


      <v-layout class="mt-4">
        <v-card elevation="3"
                class="pa-5 w-75 mx-auto parentGrid d-flex justify-center align-center flex-column-reverse"
                id="parentGrid">


<!--          <ion-grid class="grid_post d-flex" id="startGrid" v-model="col">-->
<!--            <ion-col class="ion-col-post" @click="sheet = !sheet, outPost(index), row = ion" v-model="row"-->
<!--                     v-for="(ion, index) in 5"></ion-col>-->
<!--          </ion-grid>-->



<!--          <ion-grid class="grid_post d-flex" id="startGrid" v-if="displayPost === true" v-for="(i , index) of PostStore.total" @click="col = i + 1">-->
<!--            <ion-col class="ion-col-post" @click="sheet_parent = !sheet_parent, outPost(index), row = ion" v-model="row"-->
<!--                     v-for="(ion, index) in 5"></ion-col>-->
<!--          </ion-grid>-->

<!--        <ion-grid class="grid_post d-flex justify-center align-center flex-column-reverse">-->
<!--          <ion-row v-model="col">-->
<!--            <ion-col class="ion-col-post" @click="sheet = !sheet, outPost(index), row = ion" v-model="row" v-for="(ion, index) in 5"></ion-col>-->
<!--          </ion-row>-->

<!--          <ion-row  v-model="col" v-if="displayPost === true" @click="col + 1" v-for="(ion) in col">-->
<!--            <ion-col class="ion-col-post" @click="sheet_parent = !sheet_parent, outPost(index + 10), row = ion" v-model="row" v-for="(ion, index) in 5"></ion-col>-->
<!--          </ion-row>-->

<!--        </ion-grid>-->

          <ion-grid class="grid_post d-flex justify-center align-center flex-column-reverse">
            <ion-row v-model="col" >
              <ion-col class="ion-col-post" @click="sheet = !sheet, row = ion" v-for="(ion, index) in 5"></ion-col>
            </ion-row>

            <ion-row @click="col = ion + 1" v-model="col" v-for="ion in 3">
              <ion-col @click="sheet_parent = !sheet_parent, row = ion" v-for="(ion, index) in 5"></ion-col>
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
                       @click="createPost(), sheet = !sheet, displayPost = true">
                  Додати завдання
                </v-btn>

              </div>
            </v-card-text>
          </v-card>

        </v-bottom-sheet>
      </div>

      <div>
        <v-bottom-sheet v-model="sheet_parent">
          <v-card height="700">
            <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

            <div class="selectPost">
              <v-select
                  variant="outlined"
                  prepend-icon="mdi-identifier"
                  label="Id"
                  :items=idPostsNow
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

                <div class="btnAddPost">
                  <v-btn prepend-icon="mdi-plus-circle" class="btnAddTask" variant="tonal" color="indigo"
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
import {reactive, ref} from "vue";
import {Course} from "@/models/Course";
import {Post} from "@/models/Post";
import {post} from "@/stores/post";
import PostGrid from '/src/components/Teacher/Course/PostGrid.vue';
import {reload} from "ionicons/icons";


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
// let arrRows: any = [];
// let arrCols: any = [];
let allPost = JSON.parse(localStorage.getItem('allPost'));
const idPostsNow = PostStore.idPostsNow
// let idPostsNow = PostStore.idPostNow
// findPost();

let courseUpdate = reactive({
  name: "",
  discipline: "",
  grade: null,
  yearsFrom: null,
  yearsTo: null,

})
// PostStore.PostInfo = [];


let task$ = reactive({
  courseId: Number(courseId),
  title: "",
  description: "",
  answer: "",
  points: 10,
  deadline: "",
  parentId: 0,
  requiredPoints: 0
})



// function locationClick(ion, col){
//   console.log(col, row)
// }
// let indexId: any = [];
// let indexColsId: any = [];
//
// async function findPost() {
//   await PostStore.findPostWithRow();
// }
//
// let columnMax = []
// let columnOut = 0
// function outPost(index: any) {
//   indexId = [];
//   const row: any = document.querySelectorAll('ion-col')
//   for (let rows of row) {
//     arrRows.push(rows)
//     console.log(arrRows)
//
//   }
//   indexId.push(index)
//   console.log(indexId)
//
//   const col: any = document.querySelectorAll('ion-grid');
//   for (let cols of col){
//     arrCols.push(cols)
//   }
//
//
//
// }

// let clickedCol = []


//



// async function createPost() {
//
//
//
//   const body: Post = {
//     title: task$.title,
//     description: task$.description,
//     answer: task$.answer,
//     points: +task$.points,
//     deadline: new Date(task$.deadline).toISOString(),
//     parentId: Number(task$.parentId),
//     requiredPoints: task$.requiredPoints,
//     row: row,
//     column: col
//   }
//
//
//   await PostStore.createPost(body);
//   let indexElementCLicked = indexId[0];
//   outPost(indexElementCLicked);
//
//   const post: any = JSON.parse(localStorage.getItem('post'));
//   arrRows[indexElementCLicked].innerText = post.id;
//
//
//
//
//   task$.answer = "";
//   task$.title = "";
//   task$.description = "";
//   task$.deadline = "";
//
//   //gg
//   const t = document.querySelectorAll('ion-row');
//   console.log(t[col - 1])
//   const y = document.querySelectorAll('ion-col');
//   console.log(y[row - 1])
//
//   for (let maxColumn of PostStore.PostInfo) {
//     console.log(maxColumn)
//     for (let j of maxColumn) {
//       columnMax.push(j.column)
//       console.log(j.column)
//     }
//   }
//   console.log(columnMax)
//   columnOut = (Math.max(...columnMax));
//   console.log(columnOut)
//
//
//   //2gg
//   console.log(col, row)
// }

async function createPost() {
  const body: Post = {
    title: task$.title,
    description: task$.description,
    answer: task$.answer,
    points: +task$.points,
    deadline: new Date(task$.deadline).toISOString(),
    parentId: Number(task$.parentId),
    requiredPoints: task$.requiredPoints,
    row: row,
    column: col
  }


  await PostStore.createPost(body);


  async function locationRow() {
    let rows = document.querySelectorAll('ion-row')
    let cols = document.querySelectorAll('ion-col')


    const x = (cols, rows) => {
      const post: any = JSON.parse(localStorage.getItem('post'));
      let clickedRow = rows[col - 1]
      let y = clickedRow.querySelectorAll('ion-col')
      let neededCol = y[row - 1]
      neededCol.innerText = post.id
      console.log(neededCol)
      //   for (let i of clickedRow){
      //     console.log(i.querySelectorAll('ion-col'))
      // }

    }
    x(cols, rows)
  }
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

// const locatedPost = () => {
//   for (let i of PostStore.PostInfo){
//     console.log(i)
//     for (let v of i){
//       console.log(v.column, v.row)
//       if(v.column || v.row in i){
//         console.log(v)
//         const t = document.querySelectorAll('ion-row');
//         console.log(t[v.column])
//         const y = document.querySelectorAll('ion-col');
//         console.log(y[v.row])
//       }
//     }
//   }
//   console.log(col)
// }
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
  background-color: grey;
  color: #fff;
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



</style>