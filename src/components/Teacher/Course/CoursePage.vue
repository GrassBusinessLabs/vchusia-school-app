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



          <ion-grid class="grid_post d-flex" id="startGrid">
            <ion-col class="ion-col-post" @click="sheet = !sheet, outPost(index)" v-model= "col" v-for="(ion, index) in 5"></ion-col>
          </ion-grid>

          <PostGrid v-if="showPostGrid" />


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
                       @click="createPost(), sheet = !sheet, showPostGrid = !showPostGrid">
                  Додати завдання
                </v-btn>

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
  IonRow

} from "@ionic/vue";


import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import router from "@/router";
import {course} from "@/stores/course";
import {reactive, ref} from "vue";
import {Course} from "@/models/Course";
import {Post} from "@/models/Post";
import {post} from "@/stores/post";
import PostGrid from '/src/components/Teacher/Course/PostGrid.vue';


const CourseStore = course();
const nameCourse = ['id', 'userid', 'Курс', 'Назва курсу', 'Клас', 'Вік від', 'Вік до', 'Опис курсу', 'Завдання', 'Ідентифікатор'];
const identifier = localStorage.getItem('identifier');
const parentGrid = document.querySelector('.parentGrid');
const courseId = localStorage.getItem('courseId');
const col = 1;

let sheet = ref(false);
let sheet_change = ref(false);
const PostStore = post();
let arrCols: any = [];
let showPostGrid = ref(false)

let courseUpdate = reactive({
  name: "",
  discipline: "",
  grade: null,
  yearsFrom: null,
  yearsTo: null,

})


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


let indexId: any = [];


function outPost(index: any) {
  indexId = [];
  const col: any = document.querySelectorAll('ion-col')
  for (let cols of col) {
    arrCols.push(cols)
  }
  indexId.push(index)
  console.log(indexId)

}




async function createPost () {
  const body: Post = {
    title: task$.title,
    description: task$.description,
    answer: task$.answer,
    points: +task$.points,
    deadline: new Date(task$.deadline).toISOString(),
    parentId: task$.parentId,
    requiredPoints: task$.requiredPoints,
    row: indexId[0] + 1,
    column: col
  }

  await PostStore.createPost(body)

  let indexElementCLicked = indexId[0];
  outPost(indexElementCLicked);

  const post: any = JSON.parse(localStorage.getItem('post'));
  arrCols[indexElementCLicked].innerText = post.id;


  task$.answer = "";
  task$.title = "";
  task$.description = "";
  task$.deadline = "";



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

.grid_post1 {
  display: none;
}


</style>