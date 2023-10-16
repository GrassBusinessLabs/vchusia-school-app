<template>
  <ion-page>

    <ion-header>
      <ion-item>
        <ion-searchbar animated="animated" placeholder="Пошук по курсах"></ion-searchbar>
      </ion-item>


      <ion-modal ref="modal" trigger="open-modal">
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button @click="cancel()">Скасувати</ion-button>
            </ion-buttons>
            <ion-title>Додати курс</ion-title>
            <ion-buttons slot="end">
              <ion-button :strong="true" @click="confirm()">Добавити</ion-button>
            </ion-buttons>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item>
            <ion-label position="stacked">Назва курсу</ion-label>
            <ion-input ref="input"
                       type="text"
                       placeholder="Програмування Java"
                       required
                       v-model="course$.name">


            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Назва дисципліни</ion-label>
            <ion-input ref="input"
                       type="text"
                       placeholder="Інформатика"
                       v-model="course$.discipline"
            >

            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Клас</ion-label>
            <ion-input ref="input"
                       type="number"
                       placeholder="10"
                       v-model="course$.grade"
            >
            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Вік "від"</ion-label>
            <ion-input ref="input"
                       type="number"
                       placeholder="6"
                       v-model="course$.yearsFrom"
            >
            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Вік "до"</ion-label>
            <ion-input ref="input"
                       type="number"
                       placeholder="16  "
                       v-model="course$.yearsTo"
            >
            </ion-input>
          </ion-item>

        </ion-content>
      </ion-modal>
    </ion-header>


    <ion-content>
      <div v-for="value in CourseStore.items" class="course">
        <div v-for="(name, value, index) in value" v-show="value != 'id' && value != 'userid' && value != 'description'" class="titlesCourse">
          {{ value = nameCourses[index] }}  <span class="valueCourse"> {{ name }}</span>
        </div>
      </div>

      <ion-infinite-scroll @ionInfinite="ionInfinite">
        <ion-infinite-scroll-content>

        </ion-infinite-scroll-content>
      </ion-infinite-scroll>



    </ion-content>


    <ion-footer>
      <ion-toolbar class="footer-toolbar">
        <ion-fab class="fab-footer">
          <ion-fab-button>
            <ion-icon :icon="add" color="white" id="open-modal"></ion-icon>
          </ion-fab-button>
        </ion-fab>
      </ion-toolbar>
    </ion-footer>

  </ion-page>


</template>


<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import {add} from 'ionicons/icons';
import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
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


const CourseStore = course()


const name = ref();
const modal = ref();
const input = ref();

const store = course()




let course$ = reactive({
  name: "",
  discipline: "",
  grade: null,
  yearsFrom: null,
  yearsTo: null,

})



onMounted(() => {
  store.getAllCourse()
})

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

  store.createCourse(body)
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
  width: 90%;
  margin: 10px auto;
  color: #fff;
  background: rgb(0,75,171);
  background: url(https://cdn.pixabay.com/photo/2016/11/29/01/13/background-1866485_1280.jpg);
  border-radius: 15px;
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
  padding: 12px;
  height: 10vh;
}


</style>