<script setup lang="ts">
import {IonPage, IonFooter, IonIcon, IonContent} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {onMounted, reactive, ref} from "vue";
import {add} from "ionicons/icons";
import {JoinGroup} from "@/models/Group";
import {group} from "@/stores/group";
import router from "@/router";
import AppButton from "@/components/app-components/app-button.vue";
let sheet = ref(false);
const sheet_leave_group = ref(false)
let GroupStore = group()
let idGroup = ref()
let identify = reactive({
  id: ""
})

async function joinGroup () {
  const body: JoinGroup = {
    identifier: identify.id
  }
  await GroupStore.joinGroup(body)
  identify.id = ""
  GroupStore.myGroupsList()
}

const myGroupsList = () => {
  GroupStore.myGroups = []
  GroupStore.myGroupsList()
  console.log(GroupStore.myGroups)
}

async function leaveGroup (id) {
  await GroupStore.leaveGroup(id)
  GroupStore.myGroupsList()

}

const replaceGroupPage = (groupId: any) => {
  GroupStore.idGroup = groupId
  console.log(groupId)
  router.push('/main/group-student-page')
}
onMounted(() => {myGroupsList()})
</script>

<template>
<ion-page>


  <ion-content>
    <div class="mt-4">
        <v-list  v-for="i of GroupStore.myGroups" class="list_groups">
          <v-list-item class="listGroupItem">
            <div @click="replaceGroupPage(i.id)">
              <v-list-item-title>
                {{ i.name }}
              </v-list-item-title>

            </div>
            <template v-slot:append>

              <v-btn
                  color="grey-lighten-1"
                  icon="mdi-export"
                  variant="text"
                  @click="idGroup = i.id, sheet_leave_group = !sheet_leave_group"
              ></v-btn>

            </template>
          </v-list-item>

        </v-list>
    </div>
    <p class="text-center mt-2" v-if="GroupStore.myGroups.length < 1">Приєднайтесь до групи</p>

    <div class="block_btn_add_course">
      <v-btn class="btn-add-course mb-1" icon="mdi-plus" size="70" @click="sheet = !sheet"></v-btn>
    </div>
  </ion-content>

  <ion-footer class="ion-no-border">

      <v-bottom-sheet v-model="sheet" :scrim="false">
        <v-card class="join-group-sheet" style="border-radius: 16px;">
          <v-card-title class="title-card">
            Приєднатися до групи
          </v-card-title>

          <div class="ma-4">
            <div class="textarea-solution">
              <input
                  placeholder="Ідентифікатор групи"
                  v-model="identify.id"
              />
            </div>



          </div>

          <v-card-text>
            <app-button @click="sheet = !sheet; joinGroup()">Приєднатися</app-button>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>


      <v-bottom-sheet v-model="sheet_leave_group" :scrim="false">
        <v-card style="border-radius: 16px;" class="join-group-sheet">
          <v-card-title class="title-card">
            Покинути групу?
          </v-card-title>

          <v-card-text>
            <app-button @click="leaveGroup(idGroup), sheet_leave_group = !sheet_leave_group">
              Покинути групу
            </app-button>
            <app-button @click="sheet_leave_group = !sheet_leave_group">
              Відмінити
            </app-button>

          </v-card-text>

        </v-card>
      </v-bottom-sheet>

  </ion-footer>
</ion-page>
</template>

<style scoped>
ion-content::part(background) {
  background: rgb(243, 233, 224);
}







.btn-join-group{
  min-width: 30px;
  border-radius: 50px;
  margin-top: 10px;
}

.listGroupItem {
  font-family: "Leelawadee UI", sans-serif;
  margin: 8px 15px;
  color: grey;
  border-radius: 15px;
  background: rgb(223,226,216);
  background: linear-gradient(110deg, rgba(223,226,216,1) 0%, rgba(225,255,249,1) 100%);
}
.leave_group{
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.btn_leave_group{
  margin: 15px 0;
}
.list_groups{
  padding: 0;
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
.textarea-solution{
  box-sizing: border-box;
  border: 1px solid rgb(254, 245, 235);
  border-radius: 16px;
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
.join-group-sheet{
  background: rgb(254, 245, 235);
  border-radius: 16px;
  position: absolute;
  width: 100%;
  bottom: 0;
  text-align: center;
}
</style>