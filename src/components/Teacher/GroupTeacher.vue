<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

    <ion-content>
      <v-list lines="one">
        <div v-for="i of GroupStore.allGroups">
          <v-list-item v-for="j of i"  class="listGroupItem">
            <div  @click="replaceToPageGroup(j)">
              <v-list-item-title>
                {{ j.name }}
              </v-list-item-title>
            </div>

            <template v-slot:append>

              <v-btn
                  color="grey-lighten-1"
                  icon="mdi-trash-can-outline"
                  variant="text"
                  @click="sheet_del_group = !sheet_del_group, GroupStore.idGroup = j.id"
              ></v-btn>
            </template>
          </v-list-item>

          <p class="text-center mt-2" v-if="i === null || i.length === 0">Створіть групу</p>
        </div>

      </v-list>


      <div class="block_btn_add_course">
        <v-btn class="btn-add-course mb-1" icon="mdi-plus" size="70" @click="sheet = !sheet"></v-btn>
      </div>
    </ion-content>


    <ion-footer class="ion-no-border">
        <v-bottom-sheet v-model="sheet" :scrim="false">
          <v-card
              style="border-radius: 16px;"
              class="add-group-sheet"
              height="300"

          >
            <v-card-title class="title-card">
              Створити групу
            </v-card-title>

            <div class="ml-4">

              <div class="textarea-solution">
                <input
                    class="input-course"
                    placeholder="Назва групи"
                    type="text"
                    v-model="nameGroup.name" />
              </div>



            </div>

            <v-card-text>

              <app-button @click="sheet = !sheet, createGroup()">Створити групу</app-button>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>




        <v-bottom-sheet :scrim="false" v-model="sheet_del_group">
          <v-card style="border-radius: 16px;" class="add-group-sheet" >

            <v-card-title class="title-card">
              Видалити групу?
            </v-card-title>

            <v-card-text>
              <app-button @click="deleteGroup(GroupStore.idGroup), sheet_del_group = !sheet_del_group">
                Видалити групу
              </app-button>
            </v-card-text>
<!--            <div class="w-75 d-flex justify-center align-center">-->

<!--              <v-btn :block="true" prepend-icon="mdi-delete-outline" color="red">-->

<!--              </v-btn>-->

<!--            </div>-->

          </v-card>
        </v-bottom-sheet>

    </ion-footer>


  </ion-page>
</template>

<script lang="ts" setup>
import {IonPage, IonContent, IonText, IonFooter, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent} from "@ionic/vue";
import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import {onMounted, reactive, ref} from "vue";
import {add} from "ionicons/icons";
import {Group} from "@/models/Group";
import {group} from "@/stores/group"
import router from "@/router";
import { useToast } from 'vue-toastification';
import {course} from "@/stores/course";
import {useInfiniteScroll, useVirtualList} from "@vueuse/core/index";
import AppButton from "@/components/app-components/app-button.vue";
const toast = useToast();
const CourseStore = course()
let sheet = ref(false)
const GroupStore = group()
const sheet_del_group = ref(false)

const pagination = {
  page: 1,
  count: 15
}


let nameGroup = reactive({
  name: ""
})
let nowCreated
const createGroup = () => {
  const body: Group = {
    name: nameGroup.name
  }
  GroupStore.createGroup(body)
  nameGroup.name = ""
}

function trigerCopyIdentify() {
  toast.success("Код групи скопійовано", {
    position: "top-right",
    timeout: 1533,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.32,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: false,
    rtl: false
  });
}

async function copyIdentifier(identifier) {
  try {
    await navigator.clipboard.writeText(identifier);
    trigerCopyIdentify()
  } catch ($e) {
    console.log($e)
  }
}

function getAllGroups ()  {
  GroupStore.allGroups = []
  GroupStore.getCreatedGroupsList(pagination)
}
onMounted(() => {getAllGroups()})

async function deleteGroup  (id) {
  GroupStore.allGroups = []
  console.log(id)
  triggerToast()
  await GroupStore.deleteGroup(id)
  GroupStore.getCreatedGroupsList(pagination)
}

function triggerToast() {
  toast.error("Групу видалено", {
    position: "top-right",
    timeout: 1533,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.32,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: false,
    rtl: false
  });
}
const replaceToPageGroup = (info: any) => {
  localStorage.setItem('idGroup', info.id)
  CourseStore.idGroup = info.id
  GroupStore.idGroup = info.id
  router.replace('/main/GroupPage')
}


localStorage.setItem('allGroups', JSON.stringify([GroupStore.allGroups]))
</script>

<style scoped>
.btn-add-group {
  min-width: 30px;
  border-radius: 50px;
  margin-top: 10px;
}

.listGroupItem {
  font-family: "Leelawadee UI", sans-serif;
  margin: 12px;
  color: grey;
  border-radius: 15px;
  background: rgb(223,226,216);
  background: linear-gradient(110deg, rgba(223,226,216,1) 0%, rgba(225,255,249,1) 100%);
}

.block_btn_add_course{
  position: absolute;
  bottom: 5%;
  right: 5%;
}

.btn-add-course {
  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5),inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25),0px 4px 8px 0px rgba(169, 163, 157, 0.25),0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(66, 126, 154);
  min-height: 100%;
  min-width: 60%;
  margin: 0 auto;
  color: rgb(255, 248, 237);
}

.add-group-sheet{
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