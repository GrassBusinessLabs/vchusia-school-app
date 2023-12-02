<script setup lang="ts">
import {IonPage, IonFooter, IonIcon} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {reactive, ref} from "vue";
import {add} from "ionicons/icons";
import {JoinGroup} from "@/models/Group";
import {group} from "@/stores/group";
let sheet = ref(false);
let GroupStore = group()
let identify = reactive({
  id: ""
})

const joinGroup = () => {
  const body: JoinGroup = {
    identifier: identify.id
  }
  GroupStore.joinGroup(body)
}

</script>

<template>
<ion-page>
<header>

</header>

  <main>

  </main>

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
</style>