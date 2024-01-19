<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-list>
        <ion-avatar class="ion-avatar-account" v-if="auth().user.user.avatar">
          <img :src='URL_IMG+auth().user.user.avatar' alt="Avatar" >
        </ion-avatar>

        <ion-avatar :style="{ backgroundColor: randomColor() }" class="ion-avatar-account d-flex justify-center align-center" v-if="!auth().user.user.avatar">
          <span class="initials">{{ userInitials() }}</span>
        </ion-avatar>
        <InputAvatarDialog class="mt-4" />


        <ion-buttons class="text-center d-flex justify-center mb-3" v-if="auth().user.user.avatar">
          <ion-button @click="deleteAvatar()" color="danger">Видалити аватар</ion-button>
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
            <ion-button class="btn-changes" id="open-modal-me" @click="sheetChangeUser = !sheetChangeUser">Редагувати
              дані
            </ion-button>
          </ion-item>
          <ion-item>
            <ion-button class="btn-changes" color="warning" @click="dialogDelAccount = !dialogDelAccount">Видалити аккаунт</ion-button>


          </ion-item>
        </ion-accordion-group>

      </ion-list>
    </ion-header>

    <ion-footer>

      <div class="text-center">
        <v-bottom-sheet v-model="dialogDelAccount">
          <v-card height="200">

            <v-card-text class="d-flex justify-center flex-column">
              <h3 class="text-center">Ви хочете видалити аккаунт? </h3>
              <v-btn color="red" @click="deleteAccount()">Так</v-btn>
            </v-card-text>

            <v-card-actions class="d-flex justify-center">
              <v-btn @click="dialogDelAccount = !dialogDelAccount">Відмінити</v-btn>
            </v-card-actions>

          </v-card>
        </v-bottom-sheet>
      </div>

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
import {ref, reactive} from 'vue';
import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import axios from "axios";
import InputAvatarDialog from "@/components/parts/InputAvatarDialog.vue";

const sheetChangePass = ref(false)
const modal = ref();
const modalMe = ref();
const input = ref();
const inputMe = ref();

const dialogDelAccount = ref(false);
const sheetChangeUser = ref(false);
let oldPassword = "";
let newPassword = "";
let nameMe = auth().user.user.name;

const cancel = () => modal.value.$el.dismiss(null, 'cancel');
const cancelMe = () => modalMe.value.$el.dismiss(null, 'cancel');
const URL_IMG = 'https://vchusia.grassbusinesslabs.tk/static/'

const user = reactive({
  name: auth().user.user.name,
  email: auth().user.user.email
})
const token = localStorage.getItem('token')

const confirm = () => {
  auth().changePassword({
    "oldPassword": oldPassword,
    "newPassword": newPassword
  })
  oldPassword = "";
  newPassword = "";

}


const confirmMe = async () => {
  await auth().changeMe({"name": nameMe})
  sheetChangeUser.value = false
  nameMe = ""
  await auth().getMe()
  user.name = auth().user.user.name
  user.email = auth().user.user.email
}

const deleteAccount = () => {
  auth().deleteAccount()
}

const deleteAvatar = () => {
  auth().removeAvatar()
}

const userInitials = () => {
  const nameParts = auth().user.user.name.split(' ');
  const initials = nameParts.map(part => part.charAt(0)).join('').toUpperCase();
  return initials
}

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
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
  border: 1px solid grey
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
.initials{
  font-weight: bold;
  font-size: 50px;
  color: #fff;
}
</style>