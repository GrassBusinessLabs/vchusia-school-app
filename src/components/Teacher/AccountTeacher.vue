<template>
  <ion-page>
    <ion-header>
      <ion-list>
        <ion-avatar class="ion-avatar-account">
          <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
        </ion-avatar>
        <ion-buttons class="changeAvatar">
          <ion-button>Змінити аватар</ion-button>
        </ion-buttons>

        <ion-accordion-group>
          <ion-accordion>
            <ion-item slot="header" color="light">
              <ion-label>Мої дані</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">Ім'я: {{ user?.name }}</div>
            <div class="ion-padding" slot="content">Email: {{ user?.email }}</div>
          </ion-accordion>
          <ion-item>
            <ion-button class="btn-changes" id="open-modal">Змінити пароль</ion-button>
            <ion-modal ref="modal" trigger="open-modal">
              <ion-header>
                <ion-toolbar>
                  <ion-buttons slot="start">
                    <ion-button @click="cancel()">Відмінити</ion-button>
                  </ion-buttons>
                  <ion-title>Змінити пароль</ion-title>
                  <ion-buttons slot="end">
                    <ion-button :strong="true" @click="confirm()">Змінити</ion-button>
                  </ion-buttons>
                </ion-toolbar>
              </ion-header>
              <ion-content class="ion-padding">
                <ion-item>
                  <ion-label position="stacked">Введіть ваш старий пароль</ion-label>
                  <ion-input ref="input" type="password" placeholder="********" v-model="oldPassword"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label position="stacked">Введіть ваш новий пароль</ion-label>
                  <ion-input ref="input" type="password" placeholder="********" v-model="newPassword"></ion-input>
                </ion-item>
              </ion-content>
            </ion-modal>
            <ion-button class="btn-changes">Редагувати дані</ion-button>
          </ion-item>
        </ion-accordion-group>


      </ion-list>
    </ion-header>
  </ion-page>


</template>

<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButtons,
  IonButton,
  IonAccordion,
  IonAccordionGroup,
  IonModal,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput
} from "@ionic/vue";
import {auth} from "@/stores/auth";
import {ref} from 'vue';
import axios from "axios";

const modal = ref();
const input = ref();

let oldPassword = "";
let newPassword = "";

const cancel = () => modal.value.$el.dismiss(null, 'cancel');

const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')

const confirm = () => {
  modal.value.$el.dismiss('confirm');
  auth().changePassword({
    "oldPassword" : oldPassword,
    "newPassword" : newPassword
  })
  oldPassword = "";
  newPassword = "";

}












</script>

<style scoped>
ion-header {
  padding: 50px 5px;
}

.ion-avatar-account {
  margin: 0 auto;
  height: 128px;
  width: 128px;
}

.changeAvatar {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.btn-changes {
  width: 100%;
  height: 30px;
}
</style>