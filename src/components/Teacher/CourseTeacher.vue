<template>
  <ion-page>
    <ion-header>
      <ion-item>
        <ion-searchbar animated="animated" placeholder="Пошук по курсах"></ion-searchbar>
      </ion-item>

      <ion-fab>
        <ion-fab-button>
          <ion-icon :icon="add" color="white" id="open-modal"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-header>
    <ion-content>
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
            <ion-input ref="input" type="text" placeholder="121 Конструювання ПЗ (45)" required v-model="nameCourse"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Назва дисципліни</ion-label>
            <ion-input ref="input" type="text" placeholder="Програмування"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Клас</ion-label>
            <ion-input ref="input" type="number" placeholder="10"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Вік "від"</ion-label>
            <ion-input ref="input" type="number" placeholder="2020"></ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Вік "до"</ion-label>
            <ion-input ref="input" type="number" placeholder="2024  "></ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>


</template>


<script lang="ts" setup>
import {defineComponent} from "vue";
import {ref} from 'vue';
import {add} from 'ionicons/icons';
import {OverlayEventDetail} from '@ionic/core/components';

import {
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

// export default defineComponent({
//   name: 'CourseTeacher',
//   components: {
//     IonHeader,
//     IonInput,
//     IonContent,
//     IonItem,
//     IonSearchbar,
//     IonFooter,
//     IonFab,
//     IonFabButton,
//     IonButton,
//     IonIcon,
//     IonLabel,
//     IonPage,
//     IonModal,
//     IonToolbar,
//     IonTitle
//   },
//   setup() {
//     return {add};
//   },
//
//
// })
const message = ref('1');

const modal = ref();
const input = ref();

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  const name = input.value.$el.value;
  modal.value.$el.dismiss(name, 'confirm');
};

const onWillDismiss = (ev: CustomEvent<OverlayEventDetail>) => {
  if (ev.detail.role === 'confirm') {
    message.value = ev.detail.data;
  }
};







</script>

<style scoped>

ion-fab-button {
  padding: 5px;
  margin: 10px 0 0 10px;
}

</style>