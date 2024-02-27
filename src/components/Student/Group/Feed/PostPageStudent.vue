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


const updateCommentConst = ref(false)
const PostStore = post()
const MessageStore = message()
const SolutionStore = solution()
const CommentStore = comment()
const AuthStore = auth()
const viewPrivateComment = ref(false)
const check = ref(false)
const updateCommentSheet = ref(false)
const deleteCommentSheet = ref(false)
const descriptionSolution = ref(SolutionStore.nowSolution.description);
const imgURL = 'https://vchusia.grassbusinesslabs.tk/static/'

const showPrivateCommentField = ref(false)
const showCommentField = ref(false)
const showEditCommentField = ref(false)
const formatDate = (dateString: any) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  };

  const formattedDate = new Date(dateString).toLocaleString('ua-UA', options);
  return formattedDate;
};

const formatTime = (dateString: any) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };

  const formattedTime = new Date(dateString).toLocaleString('ua-UA', options);
  return formattedTime;
};

const textCommentUpdate = reactive({
  text: ''
})
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

onMounted(async () => {
  await findSolutionByMsgId()
  await findSolutionById()
  await getCommentsMessages()

  descriptionSolution.value = SolutionStore.nowSolution.description
})

const addCommentTextMessage: Comment = reactive({
  text: ''
})

const addCommentTextSolution: Comment = reactive({
  text: ''
})
const addCommentMessage = async () => {
  await CommentStore.commentMessage(MessageStore.msgId, addCommentTextMessage)
  addCommentTextMessage.text = ''
  await getCommentsMessages()
}

const getCommentsMessages = async () => {
  await CommentStore.findByMessageId(MessageStore.msgId)
}


const updateComment = async () => {
  await CommentStore.updateComment(CommentStore.commentId, {text: textCommentUpdate.text})
  updateCommentSheet.value = false
  await getCommentsMessages()
  await getCommentSolution()
  showPrivateCommentField.value = false
  showCommentField.value = false
  showEditCommentField.value = false
}

const deleteComment = async () => {
  await CommentStore.deleteComment(CommentStore.commentId)
  deleteCommentSheet.value = false
  await getCommentSolution()
  await getCommentsMessages()
}

const getCommentSolution = async () => {
  await CommentStore.findBySolutionId(SolutionStore.solutionId)
}
getCommentSolution()

const addCommentSolution = async () => {
  await CommentStore.commentSolution(SolutionStore.solutionId, addCommentTextSolution)
  addCommentTextSolution.text = ""
  await getCommentSolution()
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

const togglePrivateCommentField = () => {
  showPrivateCommentField.value = true
  showCommentField.value = false
  showEditCommentField.value = false
}

const toggleCommentField = () => {
  showPrivateCommentField.value = false
  showCommentField.value = true
  showEditCommentField.value = false
}

const toggleEditCommentField = () => {
  showPrivateCommentField.value = false
  showCommentField.value = false
  showEditCommentField.value = true
  textCommentUpdate.text = CommentStore.nowComment.text
}
const eventClickMenuComment = (item: any) => {
  if (item.title === 'Редагувати') {
    toggleEditCommentField()
  }
  if (item.title === 'Видалити') {
    deleteCommentSheet.value = true
  }
}

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

const userInitials = () => {
  const nameParts = auth().user.user.name.split(' ');
  const initials = nameParts.map(part => part.charAt(0)).join('').toUpperCase();
  return initials
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
            <p>{{ dayOfWeek() }} {{ formatDate(MessageStore.thisMessage.deadline) }}</p>
          </div>

          <div class="description_task">
            <p>{{ MessageStore.thisMessage.text }}</p>
          </div>

        </div>

        <div>

          <div>
            <v-list>
              <v-list-item v-for="i in CommentStore.commentsSolution" class="comment_item">
                <div @click="CommentStore.commentId = i.id, CommentStore.nowComment = i" class="comment-wrapper"
                     :class="{ 'my-comment': AuthStore.user.user.id === i.userId, 'other-comment': AuthStore.user.user.id !== i.userId }">

                  <div class="content-wrapper">

                    <div class="comment-text" :class="{'textMyComment' : AuthStore.user.user.id === i.userId}">
                      <div class="comment-header">

                      </div>
                      <div class="text-block">
                        <pre>{{ i.text }}</pre>
                      </div>

                      <div class="comment-time" :class="{ 'justify-end': AuthStore.user.user.id !== i.userId }">
                        <small>{{formatTime(i.createdDate)}}</small>

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
                </div>
              </v-list-item>
            </v-list>
          </div>



          <v-btn class="btn-comment" elevation="0" @click="togglePrivateCommentField">
            Написати приватний коментар
          </v-btn>

          <v-btn class="btn-comment" elevation="0" @click="displayFooter = !displayFooter">
            Додати розв'язок
          </v-btn>

          <v-list>
            <v-list-item v-for="i in CommentStore.commentsMessage" class="comment_item">
              <div @click="CommentStore.commentId = i.id, CommentStore.nowComment = i" class="comment-wrapper"
                   :class="{ 'my-comment': AuthStore.user.user.id === i.userId, 'other-comment': AuthStore.user.user.id !== i.userId }">
                <div class="avatar-wrapper">
                  <v-avatar v-if="AuthStore.user.user.id !== i.userId" class="avatar-comment-user" :style="{ backgroundColor: randomColor() }">
                    <img :src='imgURL+i.userAvatar' v-if='i.userAvatar !== ""'>
                    <span class="initials" v-else>{{ userInitials() }}</span>
                  </v-avatar>
                </div>
                <div class="content-wrapper">

                  <div class="comment-text" :class="{'textMyComment' : AuthStore.user.user.id === i.userId}">
                    <div class="comment-header">


                    </div>
                    <div class="text-block">
                      <pre>{{ i.text }}</pre>
                    </div>

                    <div class="comment-time " >
                      <small>{{formatTime(i.createdDate)}}</small>

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
                              <v-list-item-title >{{ item.title }}</v-list-item-title>
                            </v-list-item>
                          </v-list>
                        </v-menu>
                      </div>

                    </div>
                  </div>


                </div>
              </div>
            </v-list-item>
          </v-list>
        </div>

        <v-btn class="btn-comment" elevation="0" @click="toggleCommentField">
          Написати коментар
        </v-btn>

      </div>

    </ion-content>


    <ion-footer>
      <div class="d-flex align-center" v-if="showEditCommentField">
        <ion-item class="w-100">
          <ion-textarea
              :rows="1"
              :auto-grow="true"
              placeholder="Напишіть коментар"
              v-model="textCommentUpdate.text"

          >
          </ion-textarea>

        </ion-item>
        <v-btn class="bg-transparent" icon="mdi-send" @click="updateComment()" elevation="0"></v-btn>
      </div>



      <div class="d-flex align-center" v-if="showPrivateCommentField">
        <ion-item class="w-100">
          <ion-textarea
              :rows="1"
              :auto-grow="true"
              placeholder="Напишіть приватний коментар"
              v-model="addCommentTextSolution.text"
          >
          </ion-textarea>

        </ion-item>
        <v-btn class="bg-transparent" icon="mdi-send" @click="addCommentSolution()" elevation="0"></v-btn>
      </div>


<!--      <div class="text-center">-->
<!--        <v-bottom-sheet v-model="updateCommentSheet">-->
<!--          <v-card class="d-flex justify-center">-->

<!--            <div class="d-flex align-center">-->
<!--              <ion-item class="w-100">-->
<!--                <ion-textarea-->
<!--                    :rows="1"-->
<!--                    :auto-grow="true"-->
<!--                    placeholder="Напишіть коментар"-->
<!--                    v-model="CommentStore.nowComment.text"-->
<!--                >-->
<!--                </ion-textarea>-->

<!--              </ion-item>-->
<!--              <v-btn class="bg-transparent" icon="mdi-send" @click="updateComment()" elevation="0"></v-btn>-->
<!--            </div>-->

<!--          </v-card>-->
<!--        </v-bottom-sheet>-->
<!--      </div>-->

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

      <div class="d-flex align-center" v-if="!displayFooter && showCommentField">

        <ion-item class="w-100">
          <ion-textarea
              :rows="1"
              :auto-grow="true"
              placeholder="Напишіть коментар"
              style="white-space: pre-wrap;"
              v-model="addCommentTextMessage.text"
          >
          </ion-textarea>

        </ion-item>
        <v-btn class="bg-transparent" icon="mdi-send" @click="addCommentMessage()" elevation="0"></v-btn>
      </div>
      <div class="ma-4" v-if="SolutionStore.nowSolution.points !== 0">
        {{SolutionStore.nowSolution.points}}/5
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
  margin: 10px;
  border-radius: 15px;
  color: grey;
}

.btn-comment {
  margin: 10px auto;
  width: 90%;
  border-radius: 15px;
  color: grey;
  background: rgb(206, 255, 244);
  outline: 1px ridge #a3ffea;
  background: linear-gradient(96deg, rgba(206, 255, 244, 0.4206057422969187) 0%, rgba(186, 248, 255, 1) 100%);

}

.container_comment_solution {
  width: 90%;
  margin: 0 auto;
}


.comment-wrapper {
  display: flex;
  align-items: center;

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
  align-items: center;
  margin-bottom: 5px;
  margin-top: 5px;
  margin-left: 15px;
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
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}



.text-block {
  margin-left: 15px;
}

.my-comment .comment-text {
  background-color: #d2b9ff;
}

.other-comment .comment-text {
  background-color: #e0e0e0;
}


.other-comment .comment-text::before {
  content: "";
  position: absolute;
  top: 50%;
  right: 100%;
  border: solid transparent;
  border-right-color: #e0e0e0;
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
.avatar-comment-user{
  outline: 1px solid #c4c4c4;
}
.initials{
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}
</style>