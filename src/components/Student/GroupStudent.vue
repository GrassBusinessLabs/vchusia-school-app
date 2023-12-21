<script setup lang="ts">
import {IonPage, IonFooter, IonIcon, IonContent} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {onMounted, reactive, ref} from "vue";
import {add} from "ionicons/icons";
import {JoinGroup} from "@/models/Group";
import {group} from "@/stores/group";
let sheet = ref(false);
let GroupStore = group()
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
onMounted(() => {myGroupsList()})
</script>

<template>
<ion-page>
<header>

</header>

  <ion-content>
    <div>

        <v-list>
          <v-list-item
            v-for="i of GroupStore.myGroups"
            :title="i.name"
            class="listGroupItem"
          >
            <template v-slot:append>
              <v-btn
                  color="grey-lighten-1"
                  icon="mdi-export"
                  variant="text"
                  @click="leaveGroup(i.id)"
              ></v-btn>
            </template>

          </v-list-item>
        </v-list>
    </div>
  </ion-content>

  <ion-footer>
    <div class="text-center">
      <v-btn class="btn-join-group mb-1" size="large" @click="sheet = !sheet">
        <ion-icon :icon="add" color="danger" id="open-modal"></ion-icon>
      </v-btn>
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
  margin: 12px;
  color: grey;
  border-radius: 15px;
  background: rgb(223,226,216);
  background: linear-gradient(110deg, rgba(223,226,216,1) 0%, rgba(225,255,249,1) 100%);
}
</style>