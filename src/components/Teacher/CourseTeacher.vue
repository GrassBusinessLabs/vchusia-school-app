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
                       placeholder="121 Конструювання ПЗ (45)"
                       required
                       v-model="defineComponent.nameCourse">

            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Назва дисципліни</ion-label>
            <ion-input ref="input"
                       type="text"
                       placeholder="Програмування"
                       v-model="defineComponent.nameDis"
            >

            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Клас</ion-label>
            <ion-input ref="input"
                       type="number"
                       placeholder="10"
                       v-model="defineComponent.learnClass"
            >
            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Вік "від"</ion-label>
            <ion-input ref="input"
                       type="number"
                       placeholder="2020"
                       v-model="defineComponent.ageFrom"
            >
            </ion-input>
          </ion-item>

          <ion-item>
            <ion-label position="stacked">Вік "до"</ion-label>
            <ion-input ref="input"
                       type="number"
                       placeholder="2024  "
                       v-model="defineComponent.ageTo"
            >
            </ion-input>
          </ion-item>
        </ion-content>
      </ion-modal>
    </ion-header>


    <ion-content>
      <div class="courses-content">
        <div class="course">
          <h3>Назва: {{ defineComponent.nameCourse }}</h3>
          <h4>Курс: {{ defineComponent.nameDis }}</h4>
          <pre>Клас: {{ defineComponent.learnClass }}</pre>
          <pre>Вік від: {{ defineComponent.ageFrom }}</pre>
          <pre>Вік до: {{ defineComponent.ageTo }}</pre>
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
import {ref} from 'vue';
import {add} from 'ionicons/icons';
import {OverlayEventDetail} from '@ionic/core/components';
import {defineComponent} from "vue";
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

const message = ref('1');

const name = ref();
const modal = ref();
const input = ref();

defineComponent({
  data() {
    return {
      nameCourse: "",
      nameDis: "",
      learnClass: 0,
      ageFrom: '',
      ageTo: ''
    }
  }
})


const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const confirm = () => {
  modal.value.$el.dismiss('confirm');

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
  background: url(https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y29kaW5nfGVufDB8fDB8fHww&w=1000&q=80) 100% 100%;
  /*background: rgb(0,77,71);*/
  /*background: linear-gradient(320deg, rgba(0,77,71,1) 0%, rgba(0,255,154,1) 100%);*/
  color: #fff;
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