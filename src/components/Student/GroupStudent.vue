<script setup lang="ts">
import {IonPage, IonFooter, IonIcon, IonContent} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {onMounted, reactive, ref} from "vue";
import {add} from "ionicons/icons";
import {JoinGroup} from "@/models/Group";
import {group} from "@/stores/group";
import router from "@/router";
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
    <div class="text-center">

<!--      <v-btn class="btn-join-group mb-6" size="large" @click="sheet = !sheet">-->
<!--        <ion-icon :icon="add" color="danger" id="open-modal"></ion-icon>-->
<!--      </v-btn>-->

      <v-bottom-sheet v-model="sheet">
        <v-card class="text-center" height="300">
          <v-card-text>
            <br>
            <br>

            <div>
              <v-text-field
                  color="primary"
                  label="Ідентифікатор групи"
                  variant="outlined"
                  v-model="identify.id"
              >

              </v-text-field>


              <v-btn prepend-icon="mdi-plus-circle" class="btnJoinGroup" variant="tonal" color="indigo"
                     @click="sheet = !sheet, joinGroup()">
                Приєднатися
              </v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </div>

    <div class="text-center">
      <v-bottom-sheet v-model="sheet_leave_group">
        <v-card height="250">
          <v-card-text>
            <h3 class="text-center">Ви точно хочете покинути групу?</h3>

            <div class="leave_group">
              <v-btn class="btn_leave_group" color="red" @click="leaveGroup(idGroup), sheet_leave_group = !sheet_leave_group">
                Покинути групу
              </v-btn>

              <v-btn @click="sheet_leave_group = !sheet_leave_group">
              Відмінити
              </v-btn>
            </div>
          </v-card-text>

        </v-card>
      </v-bottom-sheet>
    </div>
  </ion-footer>
</ion-page>
</template>

<style scoped>
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
  min-height: 100%;
  border-radius: 100%;
  min-width: 60%;
  margin: 0 auto;
  background: grey;
  color: #fff;
  font-size: 25px;
}
</style>