<template>
  <ion-page>

    <ion-header>
      <ion-item>
        <ion-searchbar animated="animated" placeholder="Пошук по курсах"></ion-searchbar>
      </ion-item>


      <ion-modal ref="modal" trigger="open-modal" @willDismiss="onWillDismiss">
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
                       v-model="courses.nameCourse">


            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Назва дисципліни</ion-label>
            <ion-input ref="input"
                       type="text"
                       placeholder="Інформатика"
                       v-model="courses.nameDis"
            >

            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Клас</ion-label>
            <ion-input ref="input"
                       type="number"
                       placeholder="10"
                       v-model="courses.learnClass"
            >
            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Вік "від"</ion-label>
            <ion-input ref="input"
                       type="number"
                       placeholder="6"
                       v-model="courses.ageFrom"
            >
            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Вік "до"</ion-label>
            <ion-input ref="input"
                       type="number"
                       placeholder="16  "
                       v-model="courses.ageTo"
            >
            </ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-header>


    <ion-content>
      <div class="course">
        <div class="courses-content" v-for="(value, key, index) in courses">
          {{value}}
        </div>
      </div>



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
import {reactive, ref} from 'vue';
import {add} from 'ionicons/icons';
import {OverlayEventDetail} from '@ionic/core/components';
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

const message = ref('1');

const name = ref();
const modal = ref();
const input = ref();



let courses = reactive({
  nameCourse: "",
  nameDis: "",
  learnClass: null,
  ageFrom: null,
  ageTo: null,
})

const userData = JSON.parse(localStorage.getItem('user'))

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  modal.value.$el.dismiss('confirm');
  course().createCourse({
    "nameCourse": courses.nameCourse,
    "nameDis": courses.nameDis,
    "learnClass": courses.learnClass,
    "ageFrom": courses.ageFrom,
    "ageTo": courses.ageTo
  })
  console.log(courses)

};


const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    message.value = ev.detail.data;
    message.value = 'Hello'
  }
};



</script>

<style scoped>

.course {
  width: 90%;
  border-radius: 15px;
  margin: 10px auto;
  padding: 10px;
  color: #fff;
  background: linear-gradient(seagreen, darkgreen);
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