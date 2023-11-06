<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">


    <ion-content>

      <div v-for="value in CourseStore.thisCourse" class="course">
        <div v-for="(name, value, index) in value"
             v-show="value != 'id' && value != 'userid' && value != 'Опис курсу' && value != 'Завдання' && value != 'Ідентифікатор' "
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
        <v-btn class="btn" color="indigo" @click="sheet = !sheet">
          Редагувати курс
        </v-btn>

        <v-btn class="btn" color="indigo-accent-3" @click="deleteCourse">
          Видалити курс
        </v-btn>


      </v-card>



      <v-layout class="mt-4">
        <v-card elevation="3" class="pa-5 w-75 mx-auto">
          <div>
            <ion-grid class="d-flex justify-center">
              <ion-row>
                <ion-col>Title</ion-col>
                <ion-col>Description</ion-col>
                <ion-col>Points</ion-col>
                <ion-col>Answer</ion-col>
                <ion-col>Deadline</ion-col>
              </ion-row>
            </ion-grid>

            <ion-grid>
              <ion-row>
                <ion-col>1</ion-col>
                <ion-col>1</ion-col>
                <ion-col>1</ion-col>
                <ion-col>1</ion-col>
                <ion-col>1</ion-col>
              </ion-row>
            </ion-grid>



          </div>

        </v-card>
      </v-layout>

    </ion-content>

    <ion-footer>
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
import AccountTeacher from "@/components/Teacher/AccountTeacher.vue";
import CourseTeacher from "@/components/Teacher/CourseTeacher.vue"
import TaskTeacher from "@/components/Teacher/TaskTeacher.vue"
import GroupTeacher from "@/components/Teacher/GroupTeacher.vue";
import PupilsTeacher from "@/components/Teacher/PupilsTeacher.vue"

import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import router from "@/router";
import {course} from "@/stores/course";
import {reactive, ref} from "vue";
import {Course} from "@/models/Course";

const CourseStore = course()
const nameCourse = ['id', 'userid', 'Курс', 'Назва курсу', 'Клас', 'Вік від', 'Вік до', 'Опис курсу', 'Завдання', 'Ідентифікатор']
const identifier = localStorage.getItem('identifier')
const posts = localStorage.getItem('posts')

const redirect = () => {
  localStorage.removeItem('courseId')
  localStorage.removeItem('identifier')
  localStorage.removeItem('posts')
  router.replace('/teacher-room')
}
let sheet = ref(false)

let courseUpdate = reactive({
  name: "",
  discipline: "",
  grade: null,
  yearsFrom: null,
  yearsTo: null,

})


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
const locationCourse = () => {
  router.replace('/main/courses')

}

const deleteCourse = () => {
  CourseStore.deleteCourse()
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

.layout-footer{
  max-height: 10vh;
}

ion-col {
  background-color: #135d54;
  border: solid 1px #fff;
  color: #fff;
  text-align: center;
  border-radius: 360px;
}
</style>