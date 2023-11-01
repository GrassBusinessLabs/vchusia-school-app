<template>
  <ion-page>
    <ion-header>
      <v-toolbar
          title="Курс"
          dark
          prominent
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sH6GCGsggznPZO2w47ZcJCqZoujYffx6r-7eRwoxhC-nSviTTIDImt0kKVWf-gPZ1p4&usqp=CAU"
      >
        <v-btn @click="redirect()" variant="outlined" color="indigo">Назад</v-btn>
      </v-toolbar>
    </ion-header>

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
        <v-btn class="btn" color="indigo" @click="updateCourse">
          Редагувати курс
        </v-btn>

        <v-btn class="btn" color="indigo-accent-3" @click="deleteCourse">
          Видалити курс
        </v-btn>

      </v-card>


      <v-layout class="mt-4">
        <v-card elevation="3" class="pa-5 w-75 mx-auto" v-if="posts">
          {{ posts }}

        </v-card>
      </v-layout>

    </ion-content>

  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
} from "@ionic/vue";


import router from "@/router";
import {course} from "@/stores/course";

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
const updateCourse = () => {
  CourseStore.updateCourse()
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
</style>