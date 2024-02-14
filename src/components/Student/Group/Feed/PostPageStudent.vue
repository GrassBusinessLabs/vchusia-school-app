<script setup lang="ts">
import {IonPage, IonContent, IonFooter, IonTextarea, IonItem, onIonViewWillEnter} from "@ionic/vue";
import {solution} from "@/stores/solution";
import {post} from "@/stores/post"
import CropperComponent from "@/components/parts/CropperComponent.vue";
import {onMounted, reactive, ref, watch} from "vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {message} from "@/stores/message";
import {Comment} from "@/models/Comment";
import {comment} from "@/stores/comment";
import {auth} from "@/stores/auth";

const PostStore = post()
const MessageStore = message()
const SolutionStore = solution()
const CommentStore = comment()
const AuthStore = auth()
const check = ref(false)
const updateCommentSheet = ref(false)
const deleteCommentSheet = ref(false)
const descriptionSolution = ref(SolutionStore.nowSolution.description);


const formatDate = (dateString: any) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
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
  await getCommentsMessages()

  descriptionSolution.value = SolutionStore.nowSolution.description
})

const addCommentText: Comment = reactive({
  text: ''
})
const addComment = async () => {
  await CommentStore.commentMessage(MessageStore.msgId, addCommentText)
  addCommentText.text = ''
  await getCommentsMessages()
}

const getCommentsMessages = async () => {
  await CommentStore.findByMessageId(MessageStore.msgId)
}


const updateComment = async () => {
  await CommentStore.updateComment(CommentStore.commentId, {text: CommentStore.nowComment.text})
  updateCommentSheet.value = false
  await getCommentsMessages()
}

const deleteComment = async () => {
  await CommentStore.deleteComment(CommentStore.commentId)
  deleteCommentSheet.value = false
  await getCommentsMessages()
}

const dayOfWeek = () => {
  const datesStringName = {
    1: 'Понеділок',
    2: 'Вівторок',
    3: 'Середа',
    4: 'Четвер',
    5: "П'ятниця",
    6: 'Субота',
    7: 'Неділя'
  }
  const day = new Date(MessageStore.thisMessage.deadline).getDay()
  return datesStringName[day]
}


const menuComment = [{title: 'Редагувати'}, {title: 'Видалити'}]

const eventClickMenuComment = (item: any) => {
  if (item.title === 'Редагувати') {
    updateCommentSheet.value = true
  }
  if (item.title === 'Видалити') {
    deleteCommentSheet.value = true
  }
}
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
            <p>Термін здачі </p>
            <p>{{dayOfWeek()}} {{formatDate(MessageStore.thisMessage.deadline) }}</p>
          </div>

          <div class="description_task">
            <p>{{ MessageStore.thisMessage.text }}</p>
          </div>

        </div>

        <div>
          <v-btn class="btn-comment" elevation="0" @click="displayFooter = !displayFooter">
            Додати розв'язок
          </v-btn>

          <v-list>
            <v-list-item v-for="i in CommentStore.commentsMessage" class="comment_item" :style="{ minHeight: 'auto' }">
              <div @click="CommentStore.commentId = i.id, CommentStore.nowComment = i" class="comment-wrapper"
                   :class="{ 'my-comment': AuthStore.user.user.id === i.userId, 'other-comment': AuthStore.user.user.id !== i.userId }">
                <div class="avatar-wrapper">
                  <v-avatar v-if="AuthStore.user.user.id !== i.userId">
                    <img src="../../../../assets/Vchusia.png" alt="">
                  </v-avatar>
                </div>
                <div class="content-wrapper">
                  <div class="comment-header">
                    <span class="user-name" v-if="AuthStore.user.user.id !== i.userId">User Name</span>
                  </div>
                  <div class="comment-text" :class="{'textMyComment' : AuthStore.user.user.id === i.userId}">
                    {{ i.text }}
                  </div>
                  <div class="comment-time" :class="{ 'justify-end': AuthStore.user.user.id !== i.userId }">
                    <small>13:00</small>

                    <div class="text-center" v-if="AuthStore.user.user.id === i.userId">
                      <v-menu

                      >
                        <template v-slot:activator="{ props }">
                          <v-icon
                              color="grey"
                              v-bind="props"
                              @click="CommentStore.commentId = i.id, CommentStore.nowComment = i"
                          >
                            mdi-dots-horizontal-circle-outline
                          </v-icon>
                        </template>

                        <v-list>
                          <v-list-item
                              v-for="(item, index) in menuComment"
                              :key="index"
                              @click="eventClickMenuComment(item)"
                          >
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-menu>
                    </div>

                  </div>

                </div>
              </div>
            </v-list-item>
          </v-list>
        </div>

      </div>

    </ion-content>
    <ion-footer>
      <div class="text-center">
        <v-bottom-sheet v-model="updateCommentSheet">
          <v-card class="d-flex justify-center">

              <div class="d-flex align-center" >
                <ion-item class="w-100">
                  <ion-textarea
                      :rows="1"
                      :auto-grow="true"
                      placeholder="Напишіть коментар"
                      v-model="CommentStore.nowComment.text"
                  >
                  </ion-textarea>

                </ion-item>
                <v-btn class="bg-transparent" icon="mdi-send" @click="updateComment()" elevation="0"></v-btn>
              </div>

          </v-card>
        </v-bottom-sheet>
      </div>

      <div class="text-center">
        <v-bottom-sheet v-model="deleteCommentSheet">
          <v-card>
            <v-card-text>
              <v-sheet>
                <v-container class="d-flex flex-column justify-center align-center">
                  <v-row>
                    <v-col>
                      <p>Бажаєте видалити коментар?</p>
                    </v-col>
                  </v-row>

                  <v-row class="d-flex justify-space-between">
                    <v-col>
                      <v-btn @click="deleteComment()">Так</v-btn>
                    </v-col>
                    <v-col>
                      <v-btn @click="deleteCommentSheet = !deleteCommentSheet">
                        Ні
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-container>
              </v-sheet>
            </v-card-text>
          </v-card>
        </v-bottom-sheet>
      </div>

      <div class="d-flex align-center" v-if="!displayFooter">
        <ion-item class="w-100">
          <ion-textarea
              :rows="1"
              :auto-grow="true"
              placeholder="Напишіть коментар"
              v-model="addCommentText.text"
          >
          </ion-textarea>

        </ion-item>
        <v-btn class="bg-transparent" icon="mdi-send" @click="addComment()" elevation="0"></v-btn>
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
          <v-btn class="btnAcceptTask" @click="updateStatus(), displayFooter = !displayFooter">
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
  background: rgb(149,255,98);
  background: linear-gradient(96deg, rgba(149,255,98,0.4206057422969187) 0%, rgba(186,255,212,1) 100%);
  color: grey;
}

.btn-comment {
  margin: 10px auto;
  width: 90%;
  border-radius: 15px;
  color: grey;
  background: rgb(206,255,244);
  outline: 1px ridge #a3ffea;
  background: linear-gradient(96deg, rgba(206,255,244,0.4206057422969187) 0%, rgba(186,248,255,1) 100%);

}

.container_comment_solution {
  width: 90%;
  margin: 0 auto;
}


.comment-wrapper {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  position: relative;
}

.avatar-wrapper {
  margin-right: 10px;
}

.content-wrapper {
  flex-grow: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  margin-left: 20px;
  margin-top: 10px;
}

.user-name {
  font-weight: bold;
}

.comment-text {
  background-color: #eff0f1;
  border-radius: 10px;
  padding: 10px;
  position: relative;
  margin-left: 10px;

}

.comment-time {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.textMyComment {
  text-align: right;
}

.my-comment {
  margin-top: 10px;
  margin-right: 9px;
}

.my-comment .comment-text {
  background-color: #d2b9ff;
}

.other-comment .comment-text {
  background-color: #fff;
}


.other-comment .comment-text::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  border: solid transparent;
  border-right-color: #fff;
  border-width: 10px;
  margin-top: -10px;

}


.my-comment .comment-text::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  border: solid transparent;
  border-left-color: #d2b9ff;
  border-width: 10px;
  margin-top: -10px;
}

.justify-end {
  justify-content: flex-end;
}

</style>