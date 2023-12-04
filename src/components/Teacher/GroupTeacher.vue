<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

    <ion-content>
      <v-list lines="one">
        <div v-for="i of GroupStore.allGroups">
          <v-list-item v-for="j of i" :title="j.name" class="listGroupItem">
            <template v-slot:append>
              <v-btn
                  color="grey-lighten-1"
                  icon="mdi-content-copy"
                  variant="text"
                  @click="copyIdentifier(j.identifier)"
              ></v-btn>

              <v-btn
                  color="grey-lighten-1"
                  icon="mdi-pencil-outline"
                  variant="text"
              ></v-btn>

              <v-btn
                  color="grey-lighten-1"
                  icon="mdi-trash-can-outline"
                  variant="text"
                  @click="deleteGroup(j.id)"
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
    </ion-footer>


  </ion-page>
</template>

<script lang="ts" setup>
import {IonPage, IonContent, IonText, IonFooter, IonIcon} from "@ionic/vue";
import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import {onMounted, reactive, ref} from "vue";
import {add} from "ionicons/icons";
import {Group} from "@/models/Group";
import {group} from "@/stores/group"

let sheet = ref(false)
const GroupStore = group()

let nameGroup = reactive({
  name: ""
})
let nowCreated
const createGroup = () => {
  const body: Group = {
    name: nameGroup.name
  }
  GroupStore.createGroup(body)
}

async function copyIdentifier(identifier) {
  try {
    await navigator.clipboard.writeText(identifier);
  } catch ($e) {
    console.log($e)
  }
}

const getAllGroups = () => {
  GroupStore.allGroups = []
  GroupStore.getCreatedGroupsList()
}
onMounted(() => {getAllGroups()})

const deleteGroup = (id) => {
  console.log(id)
  GroupStore.deleteGroup(id)
}


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