<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">


    <ion-content class="content">
      <!--      <div v-for="value in CourseStore.items" class="course" @click="redirect(value)" v-if="CourseStore.items.length !== 0">-->

      <!--        <div v-for="(name, value, index) in value"-->
      <!--             v-show="value != 'id' && value != 'userid' && value != 'Опис курсу' && value != 'Завдання' && value != 'Ідентифікатор'"-->
      <!--             class="titlesCourse">-->
      <!--          {{ value = nameCourses[index] }} <span class="valueCourse"> {{ name }} </span>-->
      <!--        </div>-->

      <!--      </div>-->

      <!--      <div v-else>-->
      <!--        <p class="text-center mt-3">Курсів не створено</p>-->
      <!--      </div>-->
      <div class="course-item" v-for="course of CourseStore.items" @click="redirect(course)">
        <div class="image-course">
          <img src="../../assets/img.png">
        </div>

        <div class="course-card-description">
          <h5>{{ course.discipline }}</h5>
          <p>Автори: <span>Іван Петренко, Олена Іванова</span></p>
          <p>Рік видання: <span>2023</span></p>
          <p>Дата оновлення: <span>18.10.2023</span></p>
          <p>Викладач: <span>Марина Ковальчук</span></p>
        </div>


        <div class="card-counter">
          <div class="info-counter-course">8 тем</div>
          <div class="info-counter-course">45 завдань</div>
          <div class="info-counter-course">14 годин</div>
        </div>


      </div>


    </ion-content>
    <div class="block_btn_add_course">
      <v-btn class="btn-add-course mb-1" icon="mdi-plus" size="70" @click="sheet = !sheet"></v-btn>
    </div>
    <ion-footer class="footer_course_teacher">



        <v-bottom-sheet v-model="sheet" :scrim="false">
          <v-card style="border-radius: 16px;" class="add-course-sheet">

            <v-card-title class="title-card">
              Створити курс
            </v-card-title>

            <div class="ma-4">

              <div class="textarea-solution">
                <input
                    class="input-course"
                    placeholder="Назва курсу"
                    v-model="course$.name" />
              </div>

              <div class="textarea-solution">
                <input
                    class="input-course"
                    placeholder="Назва дисципліни"

                    v-model="course$.discipline" />

              </div>

              <div class="textarea-solution">
                <input
                    class="input-course"
                    placeholder="Клас"
                    type="number"
                    v-model="course$.grade" />

              </div>


              <div class="textarea-solution">
                <input
                    class="input-course"
                    placeholder="Вік від"
                    type="number"
                    v-model="course$.yearsFrom" />

              </div>



              <div class="textarea-solution">
                <input
                    class="input-course"
                    placeholder="Вік до"
                    type="number"
                    v-model="course$.yearsTo" />

              </div>


            </div>

            <v-card-text>
              <app-button @click="confirm(), sheet = !sheet">Створити курс</app-button>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>

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
import AppButton from "@/components/app-components/app-button.vue";

const CourseStore = course()
let sheet = ref(false);
const PostStore = post();
let activePage = ref('');
const name = ref();
const modal = ref();
const input = ref();

// const store = course()
const redirect = (value: any) => {
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


const confirm = () => {
  const body: Course = {
    name: course$.name,
    discipline: course$.discipline,
    grade: Number(course$.grade),
    yearsFrom: Number(course$.yearsFrom),
    yearsTo: Number(course$.yearsTo)
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

<style lang="scss" scoped>
ion-content::part(background) {
  background: rgb(243, 233, 224);

}

ion-content {
  --padding-top: 12px
}

.course-item {
  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(254, 245, 235);
  margin: 18px;
  padding-bottom: 24px;

}

.image-course {
  margin: 2px 2px 0 2px;
  border-radius: 14px 14px 0px 0px;

  & img {
    margin-top: 2px;
    width: 100%;
  }
}


.course-card-description {
  margin: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & h5 {
    color: rgb(66, 126, 154);
    font-size: 16px;
    margin-top: 0;
    font-weight: 600;
    line-height: 19px;
    text-align: left;
  }

  & span {
    color: rgb(58, 77, 83);
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: left;
    margin: 0px 8px;
    order: 1;

  }

  & p {
    color: rgb(98, 145, 161);
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 4px 0;

  }
}

.card-counter {
  margin: 2px 16px 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  height: 31px;
  flex-wrap: wrap;

  & .info-counter-course {
    position: static;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px 8px 16px;
    color: rgb(255, 248, 237);
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: center;
    border-radius: 16px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgb(66, 126, 154);
  }

}


//.course {
//  padding: 15px;
//  width: 80%;
//  margin: 15px auto;
//  color: grey;
//  background: rgb(223,226,216);
//  background: linear-gradient(110deg, rgba(223,226,216,1) 0%, rgba(225,255,249,1) 100%);
//  border-radius: 15px;
//  outline: cyan 1px ridge;
//
//}
//
//.titlesCourse {
//  font-family: Roboto, sans-serif;
//  font-size: 20px;
//  font-weight: 700;
//}
//
//.valueCourse {
//  color: darkmagenta;
//  font-size: 18px;
//  font-family: "Fira Code Medium", monospace;
//
//}
//
//ion-fab {
//  position: relative;
//  left: 44%;
//}
//
//
//v-btn {
//  margin: 0 auto;
//}
//
.btn-add-course {
  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5),inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25),0px 4px 8px 0px rgba(169, 163, 157, 0.25),0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(66, 126, 154);
  min-height: 100%;
  min-width: 60%;
  margin: 0 auto;
  color: rgb(255, 248, 237);
}

.btnAddCourse {
  border-radius: 15px;
  padding: 5px 15px;
}

.block_btn_add_course {
  position: absolute;
  bottom: 5%;
  right: 5%;

}

.add-course-sheet{
  background: rgb(254, 245, 235);
  border-radius: 16px;
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
}
.textarea-solution{
  box-sizing: border-box;
  border: 1px solid rgb(254, 245, 235);
  border-radius: 16px;
  margin: 8px 0px;
  box-shadow: inset 0px 4px 2px 0px rgba(0, 0, 0, 0.05), inset 0px -2px 1px 0px rgb(255, 255, 255);
  background: linear-gradient(180.00deg, rgb(255, 248, 237), rgb(255, 254, 253) 199.02%);

  & input::placeholder{
    color: rgb(164, 202, 224);

  }

  & input{
    width: 100%;
    outline: none;
    padding: 16px;
    color: rgb(66, 126, 154);
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
  }
  & textarea::placeholder {
    color: rgb(164, 202, 224);

  }

  & textarea {
    width: 100%;
    outline: none;
    padding: 16px;
    color: rgb(66, 126, 154);
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
  }
}
.title-card {
  text-align: center;
  margin: 24px 0;
  color: rgb(205, 150, 129);
  font-size: 22px;
  font-weight: 700;
  line-height: 27px;
}
</style>