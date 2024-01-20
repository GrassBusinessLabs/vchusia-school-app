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

        <InputAvatarDialog class="mt-4"/>

        <ion-buttons class="text-center d-flex justify-center mb-3" v-if="auth().user.user.avatar">
          <ion-button @click="deleteAvatar()" color="danger">Видалити аватар</ion-button>
        </ion-buttons>

        <v-layout class="d-flex ma-2  justify-center">
          <v-card class="w-100 mx-2">
            <ion-item slot="header" color="light">
              <ion-label>Мої дані</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">Ім'я: {{ user?.name }}</div>
            <div class="ion-padding" slot="content">Email: {{ user?.email }}</div>
          </v-card>
        </v-layout>


          <ion-item>
            <ion-button class="btn-changes mr-1" id="open-modal" @click="sheet_change_password = !sheet_change_password">Змінити пароль</ion-button>
            <ion-button class="btn-changes" id="open-modal-me" @click="sheet_change_me = !sheet_change_me">Редагувати дані</ion-button>
          </ion-item>

          <ion-item>
            <ion-button class="btn-changes" color="warning" @click="dialog_delete_account = !dialog_delete_account">Видалити аккаунт</ion-button>
          </ion-item>



      </ion-list>
    </ion-header>

    <ion-footer>
      <div>
        <v-bottom-sheet v-model="sheet_change_password">
          <v-card height="300">
            <v-card-text>

              <v-text-field
                  prepend-icon="mdi-lock-outline"
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
                    prepend-icon="mdi-lock-outline"

                    v-model="newPassword"
                    type="password"
                    ref="input"
                    color="primary"
                    label="Новий пароль"
                    placeholder="********"
                    variant="outlined"
                    class="input-password"
                ></v-text-field>


              <v-btn variant="tonal" color="indigo" @click="confirm()"
                     class="d-flex mx-auto btn-confirm" width="85%" prepend-icon="mdi-key-variant">
                Змінити пароль
              </v-btn>
            </v-card-text>


          </v-card>
        </v-bottom-sheet>
      </div>

      <div>
        <v-bottom-sheet v-model="sheet_change_me">
          <v-card height="300">
            <v-card-text>
              <v-text-field
                  ref="inputMe"
                  v-model="nameMe"
                  color="primary"
                  label="Ваше ім'я"
                  placeholder="Михайло"
                  prepend-icon="mdi-account-box-outline"
                  variant="outlined"
                  class="input-password"
              ></v-text-field>
              <v-btn variant="tonal" color="indigo" @click="confirmMe()"
                     class="d-flex mx-auto btn-confirm" prepend-icon="mdi-pencil-outline" width="85%">
                Редагувати
              </v-btn>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </div>

      <div>
        <v-bottom-sheet v-model="dialog_delete_account">
          <v-card height="230">
            <v-card-text class="d-flex flex-column align-center">
              <h3>Ви бажаєте видалити свій аккаунт?</h3>
              <v-btn class="w-75 mt-3" color="red" @click="deleteAccount()">Так</v-btn>
            </v-card-text>
            <v-card-actions class="d-flex justify-center">
              <v-btn color="indigo" @click="dialog_delete_account = !dialog_delete_account">Відмінити</v-btn>
            </v-card-actions>
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
    IonFooter,
  IonInput,
} from "@ionic/vue";
import {auth} from "@/stores/auth";
import axios from "axios";
import {onMounted, ref, reactive} from 'vue'
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import InputAvatarDialog from "@/components/parts/InputAvatarDialog.vue";

const dialog = ref(true)
const dialog_delete_account = ref(false)
const sheet_change_password = ref(false);
const sheet_change_me = ref(false);
const modal = ref();
const modalMe = ref();
const input = ref();
const inputMe = ref();

let oldPassword = "";
let newPassword = "";
const URL_IMG = 'https://vchusia.grassbusinesslabs.tk/static/'
const cancel = () => modal.value.$el.dismiss(null, 'cancel');
const cancelMe = () => modalMe.value.$el.dismiss(null, 'cancel');

onMounted(() => {
  auth().getMe()
})

const user = reactive({
  name: auth().user.user.name,
  email: auth().user.user.email
})
let nameMe = user.name;

const token = localStorage.getItem('token')
const confirm = () => {
  auth().changePassword({
    "oldPassword": oldPassword,
    "newPassword": newPassword
  })
  sheet_change_password.value = false
  oldPassword = "";
  newPassword = "";

}

const confirmMe = async () => {
  await auth().changeMe({"name": nameMe})
  sheet_change_me.value = false
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
.btn-change{
  margin-right: 10px;
}
.input-password{
  margin: 10px;
}
.btn-confirm{
  border-radius: 15px;
  padding: 10px 10px;
}
.initials{
  font-weight: bold;
  font-size: 50px;
  color: #fff;
}
</style>