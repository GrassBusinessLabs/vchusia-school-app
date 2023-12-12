<script setup lang="ts">
import {IonPage, IonContent, IonText, IonFooter, IonIcon, IonCol, IonGrid, IonRow} from "@ionic/vue";
import router from "@/router";
import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import { useToast } from 'vue-toastification';

import {group} from "@/stores/group";
import {reactive, ref} from "vue";
import {Group, JoinGroup} from "@/models/Group";
import {add} from "ionicons/icons";
let sheet_change = ref(false);
let sheet_del = ref(false);
const GroupStore = group();
let groupIdentifier = "";
let groupName = "";
let groupId: any
const toast = useToast();
const courseAddInGroup = ref(false)
const loadGroup = () => {
  groupIdentifier = "";
  groupName = "";
  for (let i of GroupStore.allGroups){
    for(let j of i){
      if(j.id === GroupStore.idGroup){
        console.log(j)
        groupIdentifier = j.identifier
        groupName = j.name
        groupId = j.id
      } else{
        groupId = GroupStore.idGroup
        localStorage.setItem('groupId', j.id)
      }
    }
  }

  return groupId
}
loadGroup()

let groupInfo = reactive({
  name: groupName
});

function triggerToast() {
  toast.success("Успішно скопійовано", {
    position: "top-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
  });
}
async function copyIdentifier(identifier) {
  try {
    await navigator.clipboard.writeText(identifier);
  } catch ($e) {
    console.log($e)
  }
}

const changeGroup = (id) => {
  const body: Group = {
    name: groupInfo.name
  }
  GroupStore.updateGroup(id, body)
}

const deleteGroup = (id) => {
  GroupStore.deleteGroup(id)
}

const leaveGroup = (id) => {
  GroupStore.leaveGroup(id)
  router.replace('/main/groups')

}

const getUsersInGroup = (id) => {
  GroupStore.usersInGroup = []
  GroupStore.getUsersInGroup(id)
}

getUsersInGroup(groupId)

const copyEmail = (email) => {
  try {
    triggerToast()
    navigator.clipboard.writeText(email)
  } catch ($e) {
    console.log($e)
  }
}
</script>

<template>
<ion-page>
  <ion-content>
    <div v-for="i of GroupStore.allGroups">
      <div v-for="f of i">
        <div v-if="f.id === GroupStore.idGroup" class="group">
          <span>{{f.name}}</span>
        </div>
      </div>

      <div class="set_group">
        <v-btn icon="mdi-plus" size="large" @click="copyIdentifier(groupIdentifier), triggerToast()" color="teal-accent-2"></v-btn>
        <v-btn icon="mdi-pencil-outline" size="large" @click="sheet_change = !sheet_change" color="purple-lighten-2"></v-btn>
        <v-btn icon="mdi-delete-outline" size="large" @click="sheet_del = !sheet_del" color="red-accent-2"></v-btn>
      </div>
    </div>



    <v-layout class="mt-4">
      <v-card class="content_people" elevation="4">
        <p class="title_user_list">Учасники групи</p>
        <v-list class="list_users">
          <div v-for="i of GroupStore.usersInGroup">
            <v-list-item v-for="j of i" :title="j.name" :subtitle="j.email" class="user_item" @click="copyEmail(j.email)"><pre class="role_users">{{j.role}}</pre></v-list-item>
          </div>
        </v-list>
      </v-card>
    </v-layout>

    <v-layout class="mt-4">
      <v-card class="content_people" elevation="4">
        <p class="title_user_list">Список курсів</p>
        <v-list class="list_users">
          <div>
            <v-list-item title="Курс" subtitle="email" class="user_item" ><pre class="role_users"></pre></v-list-item>
          </div>
        </v-list>
      </v-card>
    </v-layout>

  </ion-content>

  <ion-footer>


    <div class="text-center">
      <v-bottom-sheet v-model="sheet_change" >
        <v-card class="text-center" height="300">

          <br>
          <br>
        <div class="sheet_change" >

          <v-text-field
              color="primary"
              label="Назва групи"
              variant="outlined"
              v-model="groupInfo.name"
          >

          </v-text-field>

          <v-btn prepend-icon="mdi-pencil-outline" @click="sheet_change = !sheet_change, changeGroup(groupId)" color="indigo">
            Змінити
          </v-btn>

        </div>

        </v-card>
      </v-bottom-sheet>
    </div>


    <div class="text-center">
      <v-bottom-sheet v-model="sheet_del" >
        <v-card class="text-center" height="300">

          <br>
          <br>
        <div class="sheet_del" >

          <v-btn prepend-icon="mdi-export" @click="sheet_del = !sheet_del, leaveGroup(groupId)" color="indigo" class="btn_leave">
            Покинути групу
          </v-btn>

          <v-btn prepend-icon="mdi-delete-outline" @click="sheet_del = !sheet_del, deleteGroup(groupId)" class="btn_del">
            Видалити групу
          </v-btn>

        </div>

        </v-card>
      </v-bottom-sheet>
    </div>

    <div class="text-center">
      <v-btn class="btn-add-course mb-1" size="large">
        <ion-icon :icon="add" color="danger" id="open-modal" @click="courseAddInGroup = !courseAddInGroup"></ion-icon>
      </v-btn>

      <v-bottom-sheet v-model="courseAddInGroup">
        <v-card height="300">
          <v-card-text>
            <v-select
                :items="['blue', 'red', 'yellow', 'green']"
                label="Вибрати курс"
                multiple
            >
            </v-select>

            <v-btn>
              Додати
            </v-btn>
          </v-card-text>

        </v-card>
      </v-bottom-sheet>
    </div>


  </ion-footer>
</ion-page>
</template>

<style scoped>
.group{
  width: 85%;
  margin: 15px auto;
  border-radius: 12px;
  padding: 10px;
  background: rgb(223,226,216);
  background: linear-gradient(110deg, rgba(223,226,216,1) 0%, rgba(225,255,249,1) 100%);
  display: flex;
  color: grey;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.set_group{
  width: 85%;
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
}
.sheet_add{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btn_join, .btn_leave, .btn_share_code, .btn_del{
  margin: 10px;
  width: 90%;
}

.sheet_change{
  width: 85%;
  margin: 0 auto;
}

.sheet_del{
  width: 85%;
  margin: 0 auto;
}
.content_people{
  width: 95%;
  margin: 15px auto;
}

.user_item{
  border-radius: 10px;
  margin: 12px;
  background: rgb(223,226,216);
  background: linear-gradient(110deg, rgba(223,226,216,1) 0%, rgba(225,255,249,1) 100%);
  color: grey;
}
.title_user_list{
  color: grey;
  text-align: center;
  font-family: "Fira Code Medium", monospace;
}
.content_people{
  background: rgb(215,255,202);
  background: linear-gradient(183deg, rgba(215,255,202,1) 0%, rgba(159,219,250,1) 100%);
}
.list_users{
  background: rgb(239,241,233);
  background: linear-gradient(183deg, rgba(239,241,233,0.8519782913165266) 0%, rgba(226,255,246,0.7819502801120448) 100%);
}

.role_users{
  color: #4c148e;
}

.btn-add-course{
  min-width: 30px;
  border-radius: 50px;
  margin-top: 10px;
}
</style>