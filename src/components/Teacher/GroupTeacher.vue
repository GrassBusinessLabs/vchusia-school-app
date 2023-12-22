<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

    <ion-content>
      <v-list lines="one">
        <div v-for="i of GroupStore.allGroups">
          <v-list-item v-for="j of i" class="listGroupItem">
            <div  @click="replaceToPageGroup(j)">
              <v-list-item-title>
                {{ j.name }}
              </v-list-item-title>
            </div>

            <template v-slot:append>
              <v-btn
                  color="grey-lighten-1"
                  icon="mdi-content-copy"
                  variant="text"
                  @click="copyIdentifier(j.identifier)"
              ></v-btn>

              <v-btn
                  color="grey-lighten-1"
                  icon="mdi-trash-can-outline"
                  variant="text"
                  @click="sheet_del_group = !sheet_del_group, GroupStore.idGroup = j.id"
              ></v-btn>
            </template>
          </v-list-item>
        </div>

      </v-list>

    </ion-content>


    <ion-footer>
      <div class="text-center">
        <v-btn class="btn-add-group mb-1" size="large" @click="sheet = !sheet">
          <ion-icon :icon="add" color="danger" id="open-modal"></ion-icon>
        </v-btn>

        <v-bottom-sheet v-model="sheet">
          <v-card
              class="text-center"
              height="300"

          >
            <v-card-text>

              <br>
              <br>

              <div>

                <v-text-field
                    color="primary"
                    label="Назва групи"
                    variant="outlined"
                    v-model="nameGroup.name"
                >

                </v-text-field>


                <v-btn prepend-icon="mdi-plus-circle" class="btnAddGroup" variant="tonal" color="indigo"
                       @click="sheet = !sheet, createGroup()">
                  Додати групу
                </v-btn>

              </div>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </div>

      <div class="text-center">
        <v-bottom-sheet v-model="sheet_del_group">
            <v-card height="200">
              <v-card-text class="d-flex flex-column justify-center align-center">
                <p class="ma-2">Ви точно хочете видалити групу?</p>
                <v-btn class="ma-2" color="red" @click="deleteGroup(GroupStore.idGroup), sheet_del_group = !sheet_del_group">Видалити</v-btn>
                <v-btn @click="sheet_del_group = !sheet_del_group">Відмінити</v-btn>
              </v-card-text>
            </v-card>
        </v-bottom-sheet>
      </div>
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
const toast = useToast();
const CourseStore = course()
let sheet = ref(false)
const GroupStore = group()
const sheet_del_group = ref(false)

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
  GroupStore.getCreatedGroupsList()
}
onMounted(() => {getAllGroups()})

async function deleteGroup  (id) {
  GroupStore.allGroups = []
  console.log(id)
  triggerToast()
  await GroupStore.deleteGroup(id)
  GroupStore.getCreatedGroupsList()
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

</style>