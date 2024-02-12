<script setup lang="ts">
import {IonContent, IonFooter, IonItem, IonPage, IonTextarea, IonInput, onIonViewWillEnter} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {computed, onMounted, reactive, ref} from "vue";
import DrawingCanvas from "@/components/parts/DrawingCanvas.vue";
import {solution} from "@/stores/solution";
import {message} from "@/stores/message";
import {MarkSolution} from "@/models/Solution";

const SolutionStore = solution()
const MessageStore = message()
const group_solution = ref(false)
const studentsListDraft = ref(false)
const studentSelected = ref(false)
const studentsChecked = ref(false)
const imageChange = ref(false)
const changeComplettedSolution = ref(false)
const image_URL = 'https://vchusia.grassbusinesslabs.tk/static/'
const points = reactive({
  0: '',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
})
let valueSliderPoint = ref(0)

const viewMode = ref(false)

const findSolutionsUsers = async () => {
  await SolutionStore.findSolutionsUsers(MessageStore.msgId)
}

onMounted(() => {
  findSolutionsUsers()
})

const findPointsUsers = () => {

  const solutionsId = SolutionStore.complettedSolutions.map(point => point.id)
  solutionsId.forEach(solutionId => {
    SolutionStore.findSolutionByIdPoints(solutionId)
  })

}

const findSolutionById = async () => {
  await SolutionStore.findSolutionById(SolutionStore.submittedSolutionsId[0])
}

const findCompletedSolution = async (studentIndex: number) => {
  await SolutionStore.findSolutionById(SolutionStore.complettedSolutions[studentIndex].id)
  changeComplettedSolution.value = true

}
const markSolution = async (status: string) => {
  console.log(SolutionStore.nowPoint)
  await SolutionStore.markSolution(SolutionStore.submittedSolutionsId[0], status, {points: SolutionStore.nowPoint})
  findSolutionsUsers()
}

const displayText = computed(() => {
  SolutionStore.nowPoint = Number(points[valueSliderPoint.value]) || 0;
  return valueSliderPoint.value === 0 ? 'Без оцінки' : points[valueSliderPoint.value];
});


</script>

<template>
  <ion-page>
    <ion-content>

      <div class="container">

        <div class="infoPost">
          <div class="title_post">
            <p style="color:grey">Оцінка за завдання {{ MessageStore.thisMessage.points }}</p>
          </div>
          <div class="deadline_points">
            <p>Виконати до {{ MessageStore.thisMessage.deadline }}</p>
          </div>
          <div class="description_task">
            <p>{{ MessageStore.thisMessage.text }}</p>
          </div>
        </div>

        <div>
          <div class="solutions_groups">
            <v-list class="pb-3">
              <v-list-item class="solution_group_item"
                           @click="group_solution = !group_solution, findSolutionById(), viewMode = false">
                <v-list-item-title class=" ml-2">
                  Очікують перевірки
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-avatar rounded="1" class=" ml-2" v-for="i in SolutionStore.submittedSolutionsId.length"
                            v-if="SolutionStore.submittedSolutionsId.length > 0">
                    <img src="../../assets/Vchusia.png" alt="Avatar">
                  </v-avatar>
                  <div v-else>
                    <h2>Немає рішень</h2>
                  </div>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="solution_group_item" @click="studentsListDraft = !studentsListDraft">
                <v-list-item-title class=" ml-2">
                  Очікуються
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-avatar rounded="1" class=" ml-2" v-for="i in SolutionStore.draftReturnSolutions.length"
                            v-if="SolutionStore.draftReturnSolutions.length > 0">
                    <img src="../../assets/Vchusia.png" alt="Avatar">
                  </v-avatar>
                  <div v-else>
                    <h2>Немає очікуваних</h2>
                  </div>
                </v-list-item-subtitle>
              </v-list-item>

              <v-list-item class="solution_group_item" @click="studentsChecked = !studentsChecked, findPointsUsers()">
                <v-list-item-title class=" ml-2">
                  Перевірені
                </v-list-item-title>
                <v-list-item-subtitle>
                  <v-avatar rounded="1" class=" ml-2" v-for="i in SolutionStore.complettedSolutions.length"
                            v-if="SolutionStore.complettedSolutions.length > 0">
                    <img src="../../assets/Vchusia.png" alt="Avatar">
                  </v-avatar>
                  <div v-else>
                    <h2>Немає рішень</h2>
                  </div>
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
                <div class="ma-2">
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
            <div class="solution_student" v-if="SolutionStore.submittedSolutionsId.length > 0">
              <div class="pb-3 ma-6">
                <p>{{ SolutionStore.nowSolution.description }}</p>
              </div>
              <div class="solution_img_container">
                <div class="images_block" v-for="i of SolutionStore.nowSolution.images">
                  <v-img class="solution_img" :src='image_URL+i.name' alt="Solution"
                         @click="imageChange = !imageChange, SolutionStore.imageURL = image_URL+i.name"></v-img>
                </div>
              </div>
              <div class="result_solution">
                <div class="mark_solution">
                  <div class="comment_for_solution">
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
                  <div class="d-flex justify-center ma-5 point-content">
                    <p><b class="font-weight-bold point"
                          :class="{ 'no_point': displayText === 'Без оцінки' }">{{ displayText }}</b></p>
                  </div>
                  <v-slider
                      :ticks="points"
                      :max="5"
                      :min="0"
                      step="1"
                      show-ticks="always"
                      tick-size="4"
                      v-model="valueSliderPoint"

                  >
                  </v-slider>
                </div>

                <div>
                  <v-btn class="w-100 mt-4" color="#090909"
                         @click="studentSelected = false, markSolution('c'), group_solution = !group_solution">
                    Виставити оцінку
                  </v-btn>
                  <v-btn class="w-100 mt-4" color="grey"
                         @click="studentSelected = false, markSolution('r'), group_solution = !group_solution">
                    Повернути
                  </v-btn>
                </div>
              </div>
            </div>

            <div class="text-center" v-else>
              <h1>Рішень немає</h1>
            </div>

          </v-card>
        </v-bottom-sheet>
      </div>


      <div class="text-center">
        <v-bottom-sheet v-model="imageChange" fullscreen>
          <v-card class="d-flex justify-center">
            <DrawingCanvas/>
          </v-card>
        </v-bottom-sheet>
      </div>

      <div class="text-center">
        <v-bottom-sheet v-model="studentsListDraft">
          <v-card height="600">
            <v-list class="students_list">
              <div v-for="i of SolutionStore.solutionsUsers" v-if="SolutionStore.draftReturnSolutions.length > 0">

                <v-list-item class="item_student" v-if="i.status === 'DRAFT' || i.status === 'RETURNED'">
                  <div class="d-flex align-center justify-space-between">

                    <div class="d-flex align-center">
                      <v-avatar class="border ma-2">
                        <img src="../../assets/Vchusia.png" alt="Avatar">
                      </v-avatar>
                      <div>
                        <v-list-item-title>
                          {{ i.userName }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          {{ i.status }}
                        </v-list-item-subtitle>
                      </div>


                    </div>


                  </div>
                </v-list-item>

              </div>

              <div class="text-center" v-else>
                <h2>Немає очікуваних</h2>
              </div>

            </v-list>
          </v-card>
        </v-bottom-sheet>
      </div>

      <div>
        <v-bottom-sheet v-model="studentsChecked">
          <v-card height="600">

            <v-list>
              <div v-for="(student, studentIndex) in SolutionStore.solutionsUsers"
                   v-if="SolutionStore.complettedSolutions.length > 0">
                <v-list-item v-if="student.status === 'COMPLETED'" class="item_student"
                             @click="findCompletedSolution(studentIndex)">
                  <div class="d-flex align-center justify-space-between">

                    <div class="d-flex align-center">
                      <v-avatar class="border ma-2">
                        <img src="../../assets/Vchusia.png" alt="Avatar">
                      </v-avatar>

                      <div>
                        <v-list-item-title>
                          {{ student.userName }}
                        </v-list-item-title>

                        <v-list-item-subtitle>
                          {{ student.status }}
                        </v-list-item-subtitle>
                      </div>

                    </div>

                    <div>
                      <p><b>{{ SolutionStore.pointsCompletted[studentIndex] }}/5</b></p>
                    </div>

                  </div>
                </v-list-item>
              </div>

              <div class="text-center" v-else>
                <h2>Немає рішень</h2>
              </div>
            </v-list>
          </v-card>
        </v-bottom-sheet>
      </div>


      <div class="text-center">
        <v-bottom-sheet v-model="changeComplettedSolution">
          <v-card height="600">
            <div>

              <div class="pb-3 ma-6">
                <p>{{ SolutionStore.nowSolution.description }}</p>
              </div>

              <div class="solution_img_container">
                <div class="images_block" v-for="i of SolutionStore.nowSolution.images">
                  <v-img class="solution_img" :src='image_URL+i.name' alt="Solution"
                         @click="imageChange = !imageChange, SolutionStore.imageURL = image_URL+i.name"></v-img>
                </div>
              </div>

              <div class="mark_solution">
                <div class="comment_for_solution">
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
                <div class="d-flex justify-center ma-5 point-content">
                  <p><b class="font-weight-bold point">{{ SolutionStore.nowSolution.points }}</b></p>
                </div>


                <v-slider
                    :ticks="points"
                    :max="5"
                    :min="0"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                    v-model="SolutionStore.nowSolution.points"

                >

                </v-slider>
              </div>

              <div class="w-75 mx-auto ma-5">
                <v-btn class="w-100 mt-4" color="grey">
                  Редагувати
                </v-btn>
              </div>


            </div>
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
  background: rgb(149, 255, 98);
  background: linear-gradient(96deg, rgba(149, 255, 98, 0.4206057422969187) 0%, rgba(186, 255, 212, 1) 100%);
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
  display: flex;
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

.point {
  font-size: 90px;
}

.item_student {
  outline: 1px solid grey;
  border-radius: 15px;
  width: 95%;
  margin: 20px auto;

}

.students_list {
  width: 90%;
  margin: 10px auto;
}

.no_point {
  font-size: 50px;
}

.point-content {
  height: 100px;
  text-align: center;
  display: flex;
  align-items: center;
}

.images_block {
  width: 30%;
}
</style>