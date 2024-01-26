<script setup lang="ts">
import {IonContent, IonFooter, IonItem, IonPage, IonTextarea, IonInput} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {reactive, ref} from "vue";
import DrawingCanvas from "@/components/parts/DrawingCanvas.vue";


const group_solution = ref(false)
const studentSelected = ref(false)
const imageChange = ref(false)
const points = reactive({
  0: 'Пусто',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
})
const valueSliderPoint = ref(0)

</script>

<template>
  <ion-page>
    <ion-content>

      <div class="container">

        <div class="infoPost">

          <div class="title_post">
            <h1>Title</h1>
            <p style="color:grey">Оцінка за завдання points</p>
          </div>

          <div class="deadline_points">
            <!--            <p class="missingDate" v-if="isFutureDate(PostStore.sharedPostInfo.deadline) == false">Пропущено термін здачі</p>-->
            <!--            <p>Виконати до {{formatDate(PostStore.sharedPostInfo.deadline)}}</p>-->
            <p>Виконати до data</p>
          </div>

          <div class="description_task">
            <p>Description</p>
          </div>

        </div>

        <div>
          <!--          <v-btn class="btn-comment" @click="displayFooter = !displayFooter">-->
          <!--            Додати розв'язок-->
          <!--          </v-btn>-->
          <div class="solutions_groups">
            <v-list class="pb-3">

              <v-list-item class="solution_group_item" @click="group_solution = !group_solution">
                <v-list-item-title class=" ml-2">
                  Виконані, не перевірені
                </v-list-item-title>

                <v-list-item-subtitle>
                  <v-avatar rounded="1" class=" ml-2" v-for="i in 3">
                    <img src="../../assets/Vchusia.png" alt="Avatar">
                  </v-avatar>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="solution_group_item" @click="group_solution = !group_solution">
                <v-list-item-title class=" ml-2">
                  Призначені, не виконані
                </v-list-item-title>

                <v-list-item-subtitle>
                  <v-avatar rounded="1" class=" ml-2" v-for="i in 2">
                    <img src="../../assets/Vchusia.png" alt="Avatar">
                  </v-avatar>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="solution_group_item" @click="group_solution = !group_solution">
                <v-list-item-title class=" ml-2">
                  Перевірені
                </v-list-item-title>

                <v-list-item-subtitle>
                  <v-avatar rounded="1" class=" ml-2" v-for="i in 5">
                    <img src="../../assets/Vchusia.png" alt="Avatar">
                  </v-avatar>
                </v-list-item-subtitle>
              </v-list-item>

            </v-list>
          </div>

          <v-list>
            <v-list-item v-for="i in 5" class="comment_item">

              <div class="d-flex pa-3">
                <div class="ma-2">
                  <v-avatar>
                    <img src="../../assets/Vchusia.png" alt="">
                  </v-avatar>
                </div>

                <div class="ma-2" >
                  <v-list-item-title>
                    Коментар
                  </v-list-item-title>

                  <v-list-item-subtitle>
                    Текст коментару
                  </v-list-item-subtitle>
                </div>
              </div>



            </v-list-item>
          </v-list>
        </div>

      </div>

    </ion-content>

    <ion-footer>
      <div class="d-flex align-center">
        <ion-item class="w-100">
          <ion-textarea
              :rows="1"
              :auto-grow="true"
              placeholder="Напишіть коментар"
          >
          </ion-textarea>

        </ion-item>
        <v-btn class="bg-transparent" icon="mdi-send" elevation="0"></v-btn>
      </div>

      <div class="text-center">
        <v-bottom-sheet v-model="group_solution">
          <v-card height="700">



            <div class="solution_student">
              <div class="pb-3 ma-6">
                <p>Description</p>
                <p>Student Name</p>


              </div>

              <div class="solution_img_container">
                <img class="solution_img" src="../../assets/Vchusia.png" alt="Solution"
                     @click="imageChange = !imageChange">
                <img class="solution_img" src="../../assets/Vchusia.png" alt="Solution"
                     @click="imageChange = !imageChange">
              </div>

              <div class="result_solution">

                <div class="mark_solution">
                  <div class="comment_for_solution" >
                    <ion-item class="w-100">
                      <ion-textarea
                          :rows="1"
                          :auto-grow="true"
                          placeholder="Напишіть коментар"

                      >
                      </ion-textarea>
                    </ion-item>
                  </div>
                  





                </div>

                <div>
                  <div class="d-flex justify-center ma-5">
                    <p><b class="font-weight-bold point">{{ points[valueSliderPoint] }}</b></p>
                  </div>


                  <v-slider
                      :ticks="points"
                      :max="5"
                      step="1"
                      show-ticks="always"
                      tick-size="4"
                      v-model="valueSliderPoint"

                  >

                  </v-slider>
                </div>

                <v-btn class="w-100" color="#090909" @click="studentSelected = false">
                  Відправити
                </v-btn>

              </div>

            </div>


          </v-card>
        </v-bottom-sheet>
      </div>


      <div class="text-center">
        <v-bottom-sheet v-model="imageChange" fullscreen>
          <v-card class="d-flex justify-center">

<DrawingCanvas />

          </v-card>
        </v-bottom-sheet>
      </div>
    </ion-footer>

  </ion-page>
</template>

<style scoped>
.container {
  width: 90%;
  margin: 0 auto;
}

.title_post {
  padding: 10px 0;
  border-bottom: 1px solid black;
}

.deadline_points {
  margin: 10px 0;
  display: flex;
  font-size: 14px;
  flex-direction: column;
  color: grey;
}

.infoPost {
  margin-bottom: 20%;
}

.comment_item {
  padding: 5px;
  margin: 10px;
  border-radius: 15px;
  background: rgb(149,255,98);
  background: linear-gradient(96deg, rgba(149,255,98,0.4206057422969187) 0%, rgba(186,255,212,1) 100%);
  color: grey;

}

.solution_group_item {
  margin: 10px 5px;
  overflow: hidden;
  border-radius: 15px;
  background: rgb(255, 251, 98);
  background: linear-gradient(96deg, rgba(255, 251, 98, 0.4206057422969187) 0%, rgba(255, 243, 186, 1) 100%);
  padding: 20px 0;
  color: grey;
  height: 100px;
}


.solution_student {
  width: 90%;
  margin: 0 auto;
}

.solution_img_container {
  margin: 10px;
}

.solution_img {
  height: 100px;
  margin: 10px;
  outline: #00b8d4 ridge 1px;
  padding: 10px;
  border-radius: 15px;

}

.mark_solution {
  display: flex;
}

.comment_for_solution {
  display: flex;
  width: 100%;
}
.point{
  font-size: 90px;
}
</style>