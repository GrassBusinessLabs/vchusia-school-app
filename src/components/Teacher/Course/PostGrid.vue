<script setup lang="ts">

import {IonCol, IonGrid} from "@ionic/vue";
import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import {reactive, ref} from "vue";
import {Post} from "@/models/Post";
import {post} from "@/stores/post";

const postInfo = JSON.parse(localStorage.getItem('post'));
const sheet = ref(false);
const PostStore = post()
const courseId = localStorage.getItem('courseId')

const $task = reactive({
  courseId: Number(courseId),
  title: "",
  description: "",
  answer: "",
  points: 10,
  deadline: "",
  parentId: null,
  requiredPoints: 0
})

let indexId: any = [];

function outPost(index: any) {
  indexId = [];
  indexId.push(index)
  console.log(indexId)

}

async function createPost() {
  const body: Post = {
    title: $task.title,
    description: $task.description,
    answer: $task.answer,
    points: +$task.points,
    deadline: new Date($task.deadline).toISOString(),
    parentId: $task.parentId,
    requiredPoints: $task.requiredPoints,
    row: indexId[0],
    column: 2
  }


  await PostStore.createPost(body)
}

</script>

<template>
  <ion-grid class="grid_post d-flex" >
    <ion-col class="ion-col-post d-flex justify-center align-center" @click="sheet = !sheet, outPost(index)"  v-for="(index, i) in 5"></ion-col>
  </ion-grid>

  <v-bottom-sheet v-model="sheet">
    <v-card height="700">
      <v-select
          class="selectPost"
          label="Select"
          :items="[postInfo.id]"
          v-model="$task.parentId"
      ></v-select>

      <v-card-text>


        <div>

          <v-text-field
              class="inputTaskStyled"
              variant="outlined"
              label="Заголовок"
              prepend-icon="mdi-bookmark-outline"
              color="primary"
              v-model="$task.title"


          >
          </v-text-field>

          <v-text-field
              class="inputTaskStyled"
              variant="outlined"
              label="Опис завдання"
              color="primary"
              prepend-icon="mdi-information-outline"
              v-model="$task.description"



          >
          </v-text-field>

          <v-text-field
              class="inputTaskStyled"
              variant="outlined"
              label="Відповідь"
              color="primary"
              prepend-icon="mdi-forum"
              v-model="$task.answer"


          >
          </v-text-field>

          <v-text-field
              class="inputTaskStyled"
              type="number"
              variant="outlined"
              label="Кількість балів"
              color="primary"
              prepend-icon="mdi-star"
              v-model="$task.points"


          >
          </v-text-field>

          <v-text-field
              class="inputTaskStyled"
              type="datetime-local"
              variant="outlined"
              label="Дата здачі"
              color="primary"
              prepend-icon="mdi-calendar-range"
              v-model="$task.deadline"


          >
          </v-text-field>


          <v-btn prepend-icon="mdi-plus-circle" class="btnAddTask" variant="tonal" color="indigo"
                 @click="sheet = !sheet, createPost()">
            Додати завдання
          </v-btn>

        </div>
      </v-card-text>
    </v-card>
  </v-bottom-sheet>
</template>

<style scoped>
ion-col{
  background: grey;
  height: 48.5px;
  width: 48.5px;
  margin: 5px;
  border-radius: 30px;
}

v-card{
  display: flex;
  width: 80%;
}
</style>