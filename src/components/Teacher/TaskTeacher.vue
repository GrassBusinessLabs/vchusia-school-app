<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

    <ion-header>

{{PostStore.posts}}
    </ion-header>


    <ion-footer>
      <div class="text-center">
        <v-btn class="btn-add-post mb-1" size="large" @click="sheet = !sheet">
          <ion-icon :icon="add" color="danger" id="open-modal"></ion-icon>
        </v-btn>

        <v-bottom-sheet v-model="sheet" >
          <v-card
              class="text-center"
              height="700"

          >
            <v-card-text>

              <br>
              <br>

              <div>

                <v-text-field
                    class="inputTaskStyled"
                    variant="outlined"
                    label="Заголовок"
                    prepend-icon="mdi-bookmark-outline"
                    color="primary"
                    v-model="task$.title"
                >
                </v-text-field>

                <v-text-field
                    class="inputTaskStyled"
                    variant="outlined"
                    label="Опис завдання"
                    color="primary"
                    prepend-icon="mdi-information-outline"
                    v-model="task$.description"

                >
                </v-text-field>

                <v-text-field
                    class="inputTaskStyled"
                    variant="outlined"
                    label="Відповідь"
                    color="primary"
                    prepend-icon="mdi-forum"

                    v-model="task$.answer"
                >
                </v-text-field>

                <v-text-field
                    class="inputTaskStyled"
                    type="number"
                    variant="outlined"
                    label="Кількість балів"
                    color="primary"
                    prepend-icon="mdi-star"
                    v-model="task$.points"

                >
                </v-text-field>

                <v-text-field
                    class="inputTaskStyled"
                    type="datetime-local"
                    variant="outlined"
                    label="Дата здачі"
                    color="primary"
                    prepend-icon="mdi-calendar-range"
                    v-model="task$.deadline"
                >
                </v-text-field>



                  <v-btn prepend-icon="mdi-plus-circle" class="btnAddTask" variant="tonal" color="indigo" @click="createPost">
                    Додати завдання
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
import {add} from 'ionicons/icons';
import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import {IonPage, IonIcon, IonHeader, IonFooter} from "@ionic/vue";
import {Post} from "@/models/Post";
import {post} from "@/stores/post"
import {reactive, ref} from "vue";
import {Course} from "@/models/Course";

let sheet = ref(false);

const PostStore = post();

let task$ = reactive({
  courseId: 126,
  title: "",
  description: "",
  answer: "",
  points: 10,
  deadline: "",
  parentId: 0,
  requiredPoints: 0
})


const createPost = () => {
  const body: Post = {
    courseId: task$.courseId,
    title: task$.title,
    description: task$.description,
    answer: task$.answer,
    points: +task$.points,
    deadline:  new Date(task$.deadline).toISOString(),
    parentId: task$.parentId,
    requiredPoints:task$.requiredPoints
  }

  PostStore.createPost(body)
  task$.answer = "";
  task$.title = "";
  task$.description = "";
  task$.deadline = "";
}


</script>

<style scoped>

.btnAddTask{
  border-radius: 15px;
  padding: 5px 15px;
}
.btn-add-post {
  min-width: 30px;
  border-radius: 50px;
  margin-top: 10px;
}

</style>