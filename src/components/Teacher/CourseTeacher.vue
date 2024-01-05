<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">
    <ion-header class="ion-no-border">
      <ion-item>
        <ion-searchbar mode="ios" animated="animated" placeholder="Пошук по курсах"></ion-searchbar>
      </ion-item>
    </ion-header>


    <ion-content class="content">
      <div v-for="value in CourseStore.items" class="course" @click="redirect(value)">

        <div v-for="(name, value, index) in value"
             v-show="value != 'id' && value != 'userid' && value != 'Опис курсу' && value != 'Завдання' && value != 'Ідентифікатор'"
             class="titlesCourse">
          {{ value = nameCourses[index] }} <span class="valueCourse"> {{ name }} </span>
        </div>

      </div>


    </ion-content>
    <div class="block_btn_add_course">
      <v-btn class="btn-add-course mb-1" @click="sheet = !sheet">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
    <ion-footer class="footer_course_teacher">


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
                    v-model="course$.name">
                </v-text-field>

                <v-text-field
                    class="input-course"
                    v-model="course$.discipline"
                    color="primary"
                    label="Назва дисципліни"
                    prepend-icon="mdi-information-outline"

                    variant="outlined">

                </v-text-field>

                <v-text-field
                    class="input-course"
                    v-model="course$.grade"
                    color="primary"
                    label="Клас"
                    prepend-icon="mdi-google-classroom"
                    variant="outlined">

                </v-text-field>

                <v-text-field
                    class="input-course"
                    v-model="course$.yearsFrom"
                    color="primary"
                    label="Вік від"
                    prepend-icon="mdi-account-child-outline"
                    variant="outlined">


                </v-text-field>

                <v-text-field
                    class="input-course"
                    v-model="course$.yearsTo"
                    color="primary"
                    prepend-icon="mdi-human-child"
                    label="Вік до"
                    variant="outlined"
                >
                </v-text-field>


                <v-btn prepend-icon="mdi-plus-circle" class="btnAddCourse" variant="tonal" color="indigo"
                       @click="confirm(), sheet = !sheet">
                  Додати курс
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
  IonMenu,
  IonPage,
  IonModal,
  IonToolbar,
  IonTitle
} from "@ionic/vue";
import {course} from "@/stores/course";
import {Course} from "@/models/Course";
import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import {post} from "@/stores/post";


import router from "@/router";

const CourseStore = course()
let sheet = ref(false);
const PostStore = post();
let activePage = ref('');
const name = ref();
const modal = ref();
const input = ref();

// const store = course()
const redirect = (value) => {
  router.replace('/main/course');
  let idCourse = value.id;
  let identifier = value.identifier
  localStorage.setItem('courseId', idCourse)
  localStorage.setItem('identifier', identifier)
  console.log(idCourse)

}


let course$ = reactive({
  name: "",
  discipline: "",
  grade: null,
  yearsFrom: null,
  yearsTo: null,

})
let totalCourses = CourseStore["total"]


const loadCourses = () => {
  CourseStore.getAllCourse({page: 1, count: totalCourses})
  CourseStore["thisCourse"] = [];
}
loadCourses();


let nameCourses = ['id', 'userid', 'Курс', 'Назва курсу', 'Клас', 'Вік від', 'Вік до', 'Опис курсу', 'Завдання', 'Ідентифікатор']


const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
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

CourseStore.groupsInCourse = []

</script>

<style scoped>

.course {
  padding: 15px;
  width: 80%;
  margin: 15px auto;
  color: grey;
  background: rgb(223,226,216);
  background: linear-gradient(110deg, rgba(223,226,216,1) 0%, rgba(225,255,249,1) 100%);
  border-radius: 15px;
  outline: cyan 1px ridge;

}

.titlesCourse {
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.valueCourse {
  color: darkmagenta;
  font-size: 18px;
  font-family: "Fira Code Medium", monospace;

}

ion-fab {
  position: relative;
  left: 44%;
}


v-btn {
  margin: 0 auto;
}

.btn-add-course {
  min-height: 100%;
  border-radius: 100%;
  min-width: 60%;
  margin: 0 auto;
  background: grey;
  outline: 1px solid cyan;
  color: #fff;
}

.btnAddCourse {
  border-radius: 15px;
  padding: 5px 15px;
}

.block_btn_add_course{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7%;
  width: 10%;
  position: absolute;
  top: 85%;
  left: 80%;

}


</style>