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
            <ion-button class="btn-changes mr-1" id="open-modal" @click="sheetChangePass = !sheetChangePass">Змінити
              пароль
            </ion-button>

            <!--            <ion-modal ref="modal" trigger="open-modal">-->
            <!--              <ion-header>-->
            <!--                <ion-toolbar>-->
            <!--                  <ion-buttons slot="start">-->
            <!--                    <ion-button @click="cancel()">Назад</ion-button>-->
            <!--                  </ion-buttons>-->
            <!--                  <ion-title>Змінити пароль</ion-title>-->
            <!--                </ion-toolbar>-->
            <!--              </ion-header>-->
            <!--              <ion-content class="ion-padding">-->
            <!--                <v-text-field-->
            <!--                    v-model="oldPassword"-->
            <!--                    ref="input"-->
            <!--                    type="password"-->
            <!--                    color="primary"-->
            <!--                    label="Введіть старий пароль"-->
            <!--                    placeholder="********"-->
            <!--                    variant="solo"-->
            <!--                    density="compact"-->
            <!--                    class="input-password"-->
            <!--                ></v-text-field>-->


            <!--                <v-text-field-->
            <!--                    v-model="newPassword"-->
            <!--                    type="password"-->
            <!--                    density="compact"-->
            <!--                    ref="input"-->
            <!--                    color="primary"-->
            <!--                    label="Новий пароль"-->
            <!--                    placeholder="********"-->
            <!--                    variant="solo"-->
            <!--                    class="input-password"-->
            <!--                ></v-text-field>-->

            <!--                <v-btn prepend-icon="$vuetify" variant="tonal" color="indigo" @click="confirm()"-->
            <!--                       class="d-flex mx-auto btn-confirm" width="85%">-->
            <!--                  Змінити пароль-->
            <!--                </v-btn>-->
            <!--              </ion-content>-->
            <!--            </ion-modal>-->
            <ion-button class="btn-changes" id="open-modal-me" @click="sheetChangeUser = !sheetChangeUser">Редагувати
              дані
            </ion-button>
            <!--            <ion-modal ref="modalMe" trigger="open-modal-me">-->
            <!--              <ion-header>-->

            <!--                <ion-toolbar>-->
            <!--                  <ion-buttons slot="start">-->
            <!--                    <ion-button @click="cancelMe()">Відмінити</ion-button>-->
            <!--                  </ion-buttons>-->
            <!--                  <ion-title>Змінити дані</ion-title>-->
            <!--                </ion-toolbar>-->
            <!--              </ion-header>-->
            <!--              <ion-content class="ion-padding">-->

            <!--                <v-text-field-->
            <!--                    ref="inputMe"-->
            <!--                    v-model="nameMe"-->
            <!--                    color="primary"-->
            <!--                    label="Ваше ім'я"-->
            <!--                    placeholder="Михайло"-->
            <!--                    variant="solo"-->
            <!--                    density="compact"-->
            <!--                    class="input-password"-->
            <!--                ></v-text-field>-->
            <!--                <v-btn prepend-icon="$vuetify" variant="tonal" color="indigo" @click="confirmMe()"-->
            <!--                       class="d-flex mx-auto btn-confirm" width="85%">-->
            <!--                  Редагувати-->
            <!--                </v-btn>-->
            <!--              </ion-content>-->
            <!--            </ion-modal>-->

          </ion-item>
          <ion-item>
            <ion-button class="btn-changes" color="warning" @click="deleteAccount()">Видалити аккаунт</ion-button>


          </ion-item>
        </ion-accordion-group>

      </ion-list>
    </ion-header>

    <ion-footer>
      <div class="text-center">
        <v-bottom-sheet v-model="sheetChangePass">
          <v-card height="500">
            <v-card-text>

              <v-text-field
                  v-model="oldPassword"
                  ref="input"
                  type="password"
                  color="primary"
                  label="Введіть старий пароль"
                  placeholder="********"
                  variant="outlined"
                  class="input-password"
              ></v-text-field>

              <v-text-field
                  v-model="newPassword"
                  type="password"
                  ref="input"
                  color="primary"
                  label="Новий пароль"
                  placeholder="********"
                  variant="outlined"
                  class="input-password"
              ></v-text-field>

              <v-btn prepend-icon="$vuetify" variant="tonal" color="indigo" @click="confirm()"
                     class="d-flex mx-auto btn-confirm" width="85%">
                Змінити пароль
              </v-btn>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </div>

      <div class="text-center">
        <v-bottom-sheet v-model="sheetChangeUser">
          <v-card height="300">
            <v-card-text>

              <v-text-field
                  ref="inputMe"
                  v-model="nameMe"
                  color="primary"
                  label="Ваше ім'я"
                  placeholder="Михайло"
                  variant="outlined"
                  class="input-password"
              ></v-text-field>
              <v-btn prepend-icon="$vuetify" variant="tonal" color="indigo" @click="confirmMe()"
                     class="d-flex mx-auto btn-confirm" width="85%">
                Редагувати
              </v-btn>
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
  IonInput,
  IonFooter
} from "@ionic/vue";
import {auth} from "@/stores/auth";
import {ref} from 'vue';
import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import axios from "axios";

const sheetChangePass = ref(false)
const modal = ref();
const modalMe = ref();
const input = ref();
const inputMe = ref();
const sheetChangeUser = ref(false)
let oldPassword = "";
let newPassword = "";
let nameMe = "";

const cancel = () => modal.value.$el.dismiss(null, 'cancel');
const cancelMe = () => modalMe.value.$el.dismiss(null, 'cancel');

const user = JSON.parse(localStorage.getItem('user'))
const token = localStorage.getItem('token')

const confirm = () => {
  auth().changePassword({
    "oldPassword": oldPassword,
    "newPassword": newPassword
  })
  oldPassword = "";
  newPassword = "";


}
const confirmMe = () => {
  auth().changeMe({"name": nameMe})
  nameMe = ""
}

const deleteAccount = () => {
  auth().deleteAccount()
}

</script>

<style scoped>
ion-header {
  padding: 50px 10px 0 0;
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

.btn-change {
  margin-right: 10px;
}

.input-password {
  margin: 10px;
}

.btn-confirm {
  border-radius: 20px;
  padding: 5px 10px;
}

</style>