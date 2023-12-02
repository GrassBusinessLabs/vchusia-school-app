<template>
  <ion-page>
      <ion-content>
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
import {reactive, ref} from "vue";
import {add} from "ionicons/icons";
import {Group} from "@/models/Group";
import {group} from "@/stores/group"
let sheet = ref(false)
const GroupStore = group()

let nameGroup = reactive({
  name: ""
})

const createGroup = () => {
  const body: Group = {
    name: nameGroup.name
  }
  GroupStore.createGroup(body)
}

</script>

<style scoped>
.btn-add-group{
  min-width: 30px;
  border-radius: 50px;
  margin-top: 10px;
}
</style>