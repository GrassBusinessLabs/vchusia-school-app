<template>
  <ion-page>

    <ion-header>
      <ion-item>
        <ion-searchbar animated="animated" placeholder="Пошук по курсах"></ion-searchbar>
      </ion-item>


      <ion-modal ref="modal" trigger="open-modal">
        <ion-header>
          <ion-toolbar>
            <ion-title>Додати курс</ion-title>
          </ion-toolbar>


        </ion-header>
        <ion-content class="ion-padding">
          <v-card
              elevation="3"
          >
            <v-container class="container-modal">
              <v-text-field
                  class="input-course"
                  color="primary"
                  label="Назва курсу"
                  variant="solo"
                  density="compact"
                  v-model="course$.name"
              ></v-text-field>

              <v-text-field
                  class="input-course"
                  v-model="course$.discipline"
                  color="primary"
                  density="compact"
                  label="Назва дисципліни"
                  variant="solo"
              ></v-text-field>

              <v-text-field
                  class="input-course"
                  v-model="course$.grade"
                  color="primary"
                  label="Клас"
                  density="compact"
                  variant="solo"
              ></v-text-field>

              <v-text-field
                  class="input-course"
                  v-model="course$.yearsFrom"
                  color="primary"
                  label="Вік від"
                  density="compact"
                  variant="solo"
              ></v-text-field>

              <v-text-field
                  class="input-course"
                  v-model="course$.yearsTo"
                  color="primary"
                  density="compact"
                  label="Вік до"
                  variant="solo"
              ></v-text-field>

              <v-btn prepend-icon="$vuetify" variant="tonal" color="indigo" @click="confirm()" class="confirm-btn">
                Додати курс
              </v-btn>
            </v-container>


          </v-card>

        </ion-content>
      </ion-modal>
    </ion-header>


    <ion-content>
      <div v-for="value in CourseStore.items" class="course">
        <div v-for="(name, value, index) in value" v-show="value != 'id' && value != 'userid' && value != 'description'"
             class="titlesCourse">
          {{ value = nameCourses[index] }} <span class="valueCourse"> {{ name }}</span>
        </div>
      </div>


    </ion-content>
    <ion-footer>
      <v-layout>
        <v-footer class="footer-toolbar">
          <v-btn class="btn-add-course" size="large">
            <ion-icon :icon="add" color="danger" id="open-modal"></ion-icon>
          </v-btn>
        </v-footer>

      </v-layout>
    </ion-footer>

  </ion-page>


</template>


<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import {add} from 'ionicons/icons';
import {
  IonButtons,
  IonHeader,
  IonContent,
  IonInput,
  IonItem,
  IonSearchbar,
  IonFooter,
  IonFab,
  IonFabButton,
  IonButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonModal,
  IonToolbar,
  IonTitle
} from "@ionic/vue";
import {course} from "@/stores/course";
import {Course} from "@/models/Course";

let sheet = false


const CourseStore = course()


const name = ref();
const modal = ref();
const input = ref();

// const store = course()


let course$ = reactive({
  name: "",
  discipline: "",
  grade: null,
  yearsFrom: null,
  yearsTo: null,

})
let totalCourses = CourseStore.total
console.log(totalCourses)


const loadCourses = () => {
  CourseStore.getAllCourse({page: 1, count: totalCourses})
}
loadCourses();


let nameCourses = ['id', 'userid', 'Курс', 'Назва курсу', 'Клас', 'Вік від', 'Вік до']


const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  modal.value.$el.dismiss('confirm');
  const body: Course = {
    name: course$.name,
    discipline: course$.discipline,
    grade: +course$.grade,
    yearsFrom: +course$.yearsFrom,
    yearsTo: +course$.yearsTo
  }

  CourseStore.createCourse(body)
  console.log(course$)
  course$.name = "";
  course$.discipline = "";
  course$.grade = null
  course$.yearsFrom = null;
  course$.yearsTo = null;


};


</script>

<style scoped>

.course {
  padding: 15px;
  width: 80%;
  margin: 15px auto;
  color: #fff;
  background: rgb(0, 75, 171);
  background: url(https://cdn.pixabay.com/photo/2016/11/29/01/13/background-1866485_1280.jpg);
  border-radius: 15px;
}

.container-modal {
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
}

.titlesCourse {
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.valueCourse {
  color: #9ae6c4;
  font-size: 18px;
  font-family: "Fira Code Medium", monospace;

}

.courses-content {
  padding: 4px 15px;
}

ion-fab {
  position: relative;
  left: 44%;
}

.footer-toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 5vh;
}

v-btn {
  margin: 0 auto;
}

.btn-add-course {
  min-width: 30px;
  border-radius: 50px;
  margin-top: 10px;
}

.add-course {
  margin-right: 15px;
}

.confirm-btn {
  border-radius: 20px;
  padding: 5px 10px;
}

</style>