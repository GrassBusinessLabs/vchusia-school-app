<script setup lang="ts">
import {IonPage, IonContent, IonFooter, IonTextarea, IonItem, onIonViewWillEnter} from "@ionic/vue";
import {solution} from "@/stores/solution";
import {post} from "@/stores/post"
import CropperComponent from "@/components/parts/CropperComponent.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {SaveSolution, UpdateSolution} from "@/models/Solution";
import {message} from "@/stores/message";

const PostStore = post()
const MessageStore = message()
const SolutionStore = solution()
const check = ref(false)

const descriptionSolution = ref(SolutionStore.nowSolution.description);


const formatDate = (dateString: any) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  };

  const formattedDate = new Date(dateString).toLocaleString('ua-UA', options);
  return formattedDate;
};

function isFutureDate(targetDate: any) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  return targetDateTime > currentDate;
}

const findSolutionByMsgId = async () => {
  await SolutionStore.findSolutionByMessageId(MessageStore.msgId)
}



const findSolutionById = async () => {
  await SolutionStore.findSolutionById(SolutionStore.solutionId)
}


const updateStatus = async () => {
  await SolutionStore.updateStatus(SolutionStore.solutionId);
};

const updateSolution = async () => {
  await SolutionStore.updateSolution(descriptionSolution, SolutionStore.solutionId);
  await findSolutionById()

};


const displayFooter = ref(false)
const deleteSolution = async () => {
  await SolutionStore.deleteSolution(SolutionStore.solutionInfo.id)
}

onMounted(async() => {
  await findSolutionByMsgId()
  await findSolutionById()
  descriptionSolution.value = SolutionStore.nowSolution.description

})
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
            <p class="missingDate" v-if="isFutureDate(MessageStore.thisMessage.deadline) == false">Пропущено термін
              здачі</p>
            <p>Виконати до {{ formatDate(MessageStore.thisMessage.deadline) }}</p>
          </div>

          <div class="description_task">
            <p>{{ MessageStore.thisMessage.text }}</p>
          </div>

        </div>

        <div>
          <v-btn class="btn-comment" @click="displayFooter = !displayFooter">
            Додати розв'язок
          </v-btn>

          <v-list>
            <v-list-item v-for="i in 5" class="comment_item">
              <v-list-item-title>
                Коментар
              </v-list-item-title>

              <v-list-item-subtitle>
                Текст коментару
              </v-list-item-subtitle>
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
      <div class="text-center" v-if="displayFooter">

        <div class="d-flex align-center container_comment_solution">
          <v-text-field class="description_text" @change="updateSolution" variant="outlined" label="Коментар"
                        v-model="descriptionSolution"></v-text-field>
        </div>


        <div class="pin_image">
          <CropperComponent/>
        </div>

        <div class="accept_task">
          <v-btn class="btnAcceptTask" @click="updateStatus(), displayFooter = !displayFooter
">
            Відправити на перевірку
          </v-btn>
        </div>

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

.missingDate {
  color: red;
  font-weight: 900;
}

.accept_task {
  width: 90%;
  margin: 20px auto 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.btnAcceptTask {
  width: 90%;
  background: #4CAF50;
  color: #fff;
}

.pin_image {
  width: 100%;
}

.description_text {
  width: 90%;
  margin: 20px auto 0 auto;
  box-sizing: border-box;
}

.infoPost {
  margin-bottom: 20%;
}

.comment_item {
  padding: 5px;
  margin: 10px;
  border-radius: 15px;
  outline: 1px solid red;
}

.btn-comment {
  margin: 10px auto;
  width: 91%;
  color: #fff;
  background: linear-gradient(#00b8d4, #00acc1);

}

.container_comment_solution {
  width: 90%;
  margin: 0 auto;
}
</style>