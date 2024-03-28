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
import PlayerActive from "@/components/icons/player-active.vue";
import ReadBookActive from "@/components/icons/read-book-active.vue";
import AvatarDev from "@/components/icons/avatar-dev.vue";
import ContentTaskDev from "@/components/icons/content-task-dev.vue";
import AddImg from "@/components/icons/add-img.vue";
import AppButton from "@/components/app-components/app-button.vue";
import AppBottomSheetSolutions from "@/components/app-components/app-bottom-sheet-solutions.vue";

const sendPrivateComment = ref(false)
const sendComment = ref(false)
const sendSolution = ref(false)
const changeComment = ref(false)


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
const descriptionSolution = reactive({
  description: SolutionStore.nowSolution.description
});
const imgURL = 'https://vchusia.grassbusinesslabs.tk/static/'

const showPrivateCommentField = ref(false)
const showCommentField = ref(false)
const showEditCommentField = ref(false)
const formatDate = (dateString: any) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
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
  await getCommentSolution()


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
  changeComment.value = true
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

const userInitials = (name: string) => {
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part.charAt(0)).join('').toUpperCase();
  return initials
}
</script>

<template>
  <ion-page>
    <ion-content>
      <!--      <div class="container">-->

      <!--        <div class="infoPost">-->

      <!--          <div class="title_post">-->
      <!--            <p style="color:grey">Оцінка за завдання {{ MessageStore.thisMessage.points }}</p>-->
      <!--          </div>-->

      <!--          <div class="deadline_points">-->
      <!--            <p class="missingDate" v-if="isFutureDate(MessageStore.thisMessage.deadline) == false">Пропущено термін-->
      <!--              здачі</p>-->
      <!--            <p>Термін здачі </p>-->
      <!--            <p>{{ dayOfWeek() }} {{ formatDate(MessageStore.thisMessage.deadline) }}</p>-->
      <!--          </div>-->

      <!--          <div class="description_task">-->
      <!--            <p>{{ MessageStore.thisMessage.text }}</p>-->
      <!--          </div>-->

      <!--        </div>-->

      <!--        <div>-->

      <!--          <div>-->
      <!--            <v-list>-->
      <!--              <v-list-item v-for="i in CommentStore.commentsSolution" class="comment_item">-->
      <!--                <div @click="CommentStore.commentId = i.id, CommentStore.nowComment = i" class="comment-wrapper"-->
      <!--                     :class="{ 'my-comment': AuthStore.user.id === i.userId, 'other-comment': AuthStore.user.id !== i.userId }">-->

      <!--                  <div class="content-wrapper">-->

      <!--                    <div class="comment-text" :class="{'textMyComment' : AuthStore.user.id === i.userId}">-->
      <!--                      <div class="comment-header">-->

      <!--                      </div>-->
      <!--                      <div class="text-block">-->
      <!--                        <pre>{{ i.text }}</pre>-->
      <!--                      </div>-->

      <!--                      <div class="comment-time" :class="{ 'justify-end': AuthStore.user.id !== i.userId }">-->
      <!--                        <small>{{formatTime(i.createdDate)}}</small>-->

      <!--                        <div class="text-center" v-if="AuthStore.user.id === i.userId">-->
      <!--                          <v-menu-->

      <!--                          >-->
      <!--                            <template v-slot:activator="{ props }">-->
      <!--                              <v-icon-->
      <!--                                  color="grey"-->
      <!--                                  v-bind="props"-->
      <!--                                  @click="CommentStore.commentId = i.id, CommentStore.nowComment = i"-->
      <!--                              >-->
      <!--                                mdi-dots-horizontal-circle-outline-->
      <!--                              </v-icon>-->
      <!--                            </template>-->

      <!--                            <v-list>-->
      <!--                              <v-list-item-->
      <!--                                  v-for="(item, index) in menuComment"-->
      <!--                                  :key="index"-->
      <!--                                  @click="eventClickMenuComment(item)"-->
      <!--                              >-->
      <!--                                <v-list-item-title>{{ item.title }}</v-list-item-title>-->
      <!--                              </v-list-item>-->
      <!--                            </v-list>-->
      <!--                          </v-menu>-->
      <!--                        </div>-->

      <!--                      </div>-->
      <!--                    </div>-->
      <!--                  </div>-->
      <!--                </div>-->
      <!--              </v-list-item>-->
      <!--            </v-list>-->
      <!--          </div>-->


      <!--          <v-btn class="btn-comment" elevation="0" @click="togglePrivateCommentField">-->
      <!--            Написати приватний коментар-->
      <!--          </v-btn>-->

      <!--          <v-btn class="btn-comment" elevation="0" @click="displayFooter = !displayFooter">-->
      <!--            Додати розв'язок-->
      <!--          </v-btn>-->

      <!--          <v-list>-->
      <!--            <v-list-item v-for="i in CommentStore.commentsMessage" class="comment_item">-->
      <!--              <div @click="CommentStore.commentId = i.id, CommentStore.nowComment = i" class="comment-wrapper"-->
      <!--                   :class="{ 'my-comment': AuthStore.user.id === i.userId, 'other-comment': AuthStore.user.id !== i.userId }">-->
      <!--                <div class="avatar-wrapper">-->
      <!--                  <v-avatar v-if="AuthStore.user.id !== i.userId" class="avatar-comment-user" :style="{ backgroundColor: randomColor() }">-->
      <!--                    <img :src='imgURL+i.userAvatar' v-if='i.userAvatar !== ""'>-->
      <!--                    <span class="initials" v-else>{{ userInitials() }}</span>-->
      <!--                  </v-avatar>-->
      <!--                </div>-->
      <!--                <div class="content-wrapper">-->

      <!--                  <div class="comment-text" :class="{'textMyComment' : AuthStore.user.id === i.userId}">-->
      <!--                    <div class="comment-header">-->


      <!--                    </div>-->
      <!--                    <div class="text-block">-->
      <!--                      <pre>{{ i.text }}</pre>-->
      <!--                    </div>-->

      <!--                    <div class="comment-time " >-->
      <!--                      <small>{{formatTime(i.createdDate)}}</small>-->

      <!--                      <div class="text-center" v-if="AuthStore.user.id === i.userId">-->
      <!--                        <v-menu-->

      <!--                        >-->
      <!--                          <template v-slot:activator="{ props }">-->
      <!--                            <v-icon-->
      <!--                                color="grey"-->
      <!--                                v-bind="props"-->
      <!--                                @click="CommentStore.commentId = i.id, CommentStore.nowComment = i"-->
      <!--                            >-->
      <!--                              mdi-dots-horizontal-circle-outline-->
      <!--                            </v-icon>-->
      <!--                          </template>-->

      <!--                          <v-list>-->
      <!--                            <v-list-item-->
      <!--                                v-for="(item, index) in menuComment"-->
      <!--                                :key="index"-->
      <!--                                @click="eventClickMenuComment(item)"-->
      <!--                            >-->
      <!--                              <v-list-item-title >{{ item.title }}</v-list-item-title>-->
      <!--                            </v-list-item>-->
      <!--                          </v-list>-->
      <!--                        </v-menu>-->
      <!--                      </div>-->

      <!--                    </div>-->
      <!--                  </div>-->


      <!--                </div>-->
      <!--              </div>-->
      <!--            </v-list-item>-->
      <!--          </v-list>-->
      <!--        </div>-->

      <!--        <v-btn class="btn-comment" elevation="0" @click="toggleCommentField">-->
      <!--          Написати коментар-->
      <!--        </v-btn>-->

      <!--      </div>-->

      <!--    </ion-content>-->


      <!--    <ion-footer>-->
      <!--      <div class="d-flex align-center" v-if="showEditCommentField">-->
      <!--        <ion-item class="w-100">-->
      <!--          <ion-textarea-->
      <!--              :rows="1"-->
      <!--              :auto-grow="true"-->
      <!--              placeholder="Напишіть коментар"-->
      <!--              v-model="textCommentUpdate.text"-->

      <!--          >-->
      <!--          </ion-textarea>-->

      <!--        </ion-item>-->
      <!--        <v-btn class="bg-transparent" icon="mdi-send" @click="updateComment()" elevation="0"></v-btn>-->
      <!--      </div>-->


      <!--      <div class="d-flex align-center" v-if="showPrivateCommentField">-->
      <!--        <ion-item class="w-100">-->
      <!--          <ion-textarea-->
      <!--              :rows="1"-->
      <!--              :auto-grow="true"-->
      <!--              placeholder="Напишіть приватний коментар"-->
      <!--              v-model="addCommentTextSolution.text"-->
      <!--          >-->
      <!--          </ion-textarea>-->

      <!--        </ion-item>-->
      <!--        <v-btn class="bg-transparent" icon="mdi-send" @click="addCommentSolution()" elevation="0"></v-btn>-->
      <!--      </div>-->


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

      <!--      <div class="text-center">-->
      <!--        <v-bottom-sheet v-model="deleteCommentSheet">-->
      <!--          <v-card>-->
      <!--            <v-card-text>-->
      <!--              <v-sheet>-->
      <!--                <v-container class="d-flex flex-column justify-center align-center">-->
      <!--                  <v-row>-->
      <!--                    <v-col>-->
      <!--                      <p>Бажаєте видалити коментар?</p>-->
      <!--                    </v-col>-->
      <!--                  </v-row>-->

      <!--                  <v-row class="d-flex justify-space-between">-->
      <!--                    <v-col>-->
      <!--                      <v-btn @click="deleteComment()">Так</v-btn>-->
      <!--                    </v-col>-->
      <!--                    <v-col>-->
      <!--                      <v-btn @click="deleteCommentSheet = !deleteCommentSheet">-->
      <!--                        Ні-->
      <!--                      </v-btn>-->
      <!--                    </v-col>-->
      <!--                  </v-row>-->
      <!--                </v-container>-->
      <!--              </v-sheet>-->
      <!--            </v-card-text>-->
      <!--          </v-card>-->
      <!--        </v-bottom-sheet>-->
      <!--      </div>-->

      <!--      <div class="d-flex align-center" v-if="!displayFooter && showCommentField">-->

      <!--        <ion-item class="w-100">-->
      <!--          <ion-textarea-->
      <!--              :rows="1"-->
      <!--              :auto-grow="true"-->
      <!--              placeholder="Напишіть коментар"-->
      <!--              style="white-space: pre-wrap;"-->
      <!--              v-model="addCommentTextMessage.text"-->
      <!--          >-->
      <!--          </ion-textarea>-->

      <!--        </ion-item>-->
      <!--        <v-btn class="bg-transparent" icon="mdi-send" @click="addCommentMessage()" elevation="0"></v-btn>-->
      <!--      </div>-->
      <!--      <div class="ma-4" v-if="SolutionStore.nowSolution.points !== 0">-->
      <!--        {{SolutionStore.nowSolution.points}}/5-->
      <!--      </div>-->

      <!--      <div class="text-center" v-if="displayFooter">-->

      <!--        <div class="d-flex align-center container_comment_solution">-->
      <!--          <v-text-field class="description_text" @input="updateSolution" variant="outlined" label="Коментар"-->
      <!--                        v-model="descriptionSolution.description"></v-text-field>-->
      <!--        </div>-->


      <!--        <div class="pin_image">-->
      <!--          <CropperComponent/>-->
      <!--        </div>-->

      <!--        <div class="accept_task">-->
      <!--          <v-btn class="btnAcceptTask" @click="updateStatus(), displayFooter = !displayFooter">-->
      <!--            Відправити на перевірку-->
      <!--          </v-btn>-->
      <!--        </div>-->

      <!--      </div>-->


      <!--    </ion-footer>-->

      <div class="container">
        <div class="task-card">
          <div class="type-task-logo">
            <div class="logo">
              <player-active/>
            </div>
            <div class="description-task-card">
              <p class="number-task">Завдання № 555-11</p>
            </div>
          </div>

        </div>


        <div class="content-task">
          <img
              src="https://platinumlist.net/guide/wp-content/uploads/2023/03/8359_img_worlds_of_adventure-big1613913137.jpg-1024x683.webp">
        </div>

        <div class="description-task">
          <p>
            Напишіть програму, яка зчитує довжину основи та висоту прямокутного трикутника (цілі числа), обчислює площу
            і друкує її значення на екрані у відформатованому вигляді (два символи після десяткової крапки). Кожен
            параметр вводиться на окремому рядку.
          </p>
        </div>

        <div class="users-solution-card">
          <div class="deadline">
            <span class="deadline-title">Термін здачі завдання</span>
            <span class="deadline-date">05.12.2024</span>
          </div>

          <div class="users">
            <div class="avatars">
              <v-avatar class="avatar" v-for="(i, index) in 7" :key="index" :style="{ zIndex: 7 - index }">
                <img
                    src="https://kartinki.pics/pics/uploads/posts/2022-09/1662642152_1-kartinkin-net-p-risunok-na-avatarku-dlya-muzhchin-instagra-1.jpg">
              </v-avatar>
            </div>

            <div class="counter">
              <span>7/18</span>
            </div>
          </div>

        </div>

        <app-button @click="sendSolution = !sendSolution">Надіслати відповідь</app-button>


        <div class="speaking-with-teacher">
          <h3>Обговорення з викладачем</h3>

          <div class="comment-card" v-for="i of CommentStore.commentsSolution">
            <div class="user-info">
              <div class="menu-comment">
                <v-menu >
                  <template v-slot:activator="{ props }" >
                    <v-icon
                        color="grey"
                        v-bind="props"
                        @click="CommentStore.commentId = i.id; CommentStore.nowComment = i"
                    >
                      mdi-dots-horizontal-circle-outline
                    </v-icon>
                  </template>

                  <v-list class="list-menu-comment" style="border-radius: 16px; box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);background: rgb(243, 233, 224);">
                    <v-list-item
                        class="list-item-menu-comment"
                        v-for="(item, index) in menuComment"
                        :key="index"
                        @click="eventClickMenuComment(item)"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div class="avatar-comment">
                <v-avatar class="user-avatar" v-if="i.userAvatar !== ''">
                  <v-img :src="imgURL+i.userAvatar"></v-img>
                </v-avatar>
                <v-avatar class="user-avatar" v-else><span class="initials">{{ userInitials(i.userName) }}</span>
                </v-avatar>
                <div class="comment-info">
                  <p class="name-user-comment">{{ i.userName }}</p>
                  <div class="d-flex">
                    <p class="data-send-comment">{{ formatDate(i.createdDate) }}</p> <span class="role-user">(студент курсу)</span>
                  </div>
                </div>


              </div>


            </div>


            <div class="comment-text-card">
              <p>{{ i.text }}</p>
            </div>
          </div>

          <app-button @click="sendPrivateComment = !sendPrivateComment">Написати приватний коментар</app-button>
        </div>

        <div class="speaking">
          <h3>Обговорення</h3>

          <div class="comment-card" v-for="i of CommentStore.commentsMessage">

            <div class="user-info position-relative">
              <div class="menu-comment">
                <v-menu >
                  <template v-slot:activator="{ props }" >
                    <v-icon
                        color="grey"
                        v-bind="props"
                        @click="CommentStore.commentId = i.id; CommentStore.nowComment = i"
                    >
                      mdi-dots-horizontal-circle-outline
                    </v-icon>
                  </template>

                  <v-list class="list-menu-comment" style="border-radius: 16px; box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);background: rgb(243, 233, 224);">
                    <v-list-item
                        class="list-item-menu-comment"
                        v-for="(item, index) in menuComment"
                        :key="index"
                        @click="eventClickMenuComment(item)"
                    >
                      <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
              <div class="avatar-comment">
                <v-avatar class="user-avatar" v-if="i.userAvatar !== ''">
                  <v-img :src="imgURL+i.userAvatar"></v-img>
                </v-avatar>
                <v-avatar class="user-avatar" v-else><span class="initials">{{ userInitials(i.userName) }}</span>
                </v-avatar>

                <div class="comment-info">
                  <p class="name-user-comment">{{ i.userName }}</p>
                  <div class="d-flex">
                    <p class="data-send-comment">{{ formatDate(i.createdDate) }}</p> <span class="role-user">(студент курсу)</span>
                  </div>
                </div>

              </div>

            </div>


            <div class="comment-text-card">
              <p>{{ i.text }}</p>
            </div>
          </div>
        </div>
        <app-button @click="sendComment = !sendComment">Написати коментар</app-button>

      </div>

      <!--   BOTTOM SHEET FOR SEND SOLUTION   -->
      <v-bottom-sheet v-model="sendSolution" :scrim="false">
        <v-card class="solution-card" style="border-radius: 16px;">
          <v-card-title class="title-card">
            Відповідь до завдання
          </v-card-title>

          <div class="solution-text-card">
            <div class="textarea-solution">
              <textarea placeholder="Текст відповіді"></textarea>
            </div>
          </div>

          <div class="images-card">
            <h3>Зображення</h3>


            <div class="gallery">

              <div>
                <cropper-component class="image"/>
              </div>

              <div v-for="i of SolutionStore.nowSolution.images" class="image-block">
                <img :src="imgURL + i.name" class="image">
              </div>
            </div>


          </div>

          <v-card-text>
            <app-button @click="updateStatus(); sendSolution = false">Надіслати відповідь</app-button>
          </v-card-text>

        </v-card>

      </v-bottom-sheet>


<!--   BOTTOM SHEET FOR WRITE PRIVATE COMMENT   -->
      <v-bottom-sheet v-model="sendPrivateComment" :scrim="false">
        <v-card class="solution-card" style="border-radius: 16px;">
          <v-card-title class="title-card">
            Написати приватний коментар
          </v-card-title>
          <div class="solution-text-card">
            <div class="textarea-solution">
              <textarea placeholder="Написати коментар..." v-model="addCommentTextSolution.text"></textarea>
            </div>
          </div>

          <v-card-text>
            <app-button @click="sendPrivateComment = false; addCommentSolution()">Відправити коментар</app-button>
          </v-card-text>

        </v-card>
      </v-bottom-sheet>

      <!--   BOTTOM SHEET FOR WRITE PUBLIC COMMENT   -->
      <v-bottom-sheet v-model="sendComment" :scrim="false">
        <v-card class="solution-card" style="border-radius: 16px;">
          <v-card-title class="title-card">
            Написати коментар
          </v-card-title>
          <div class="solution-text-card">
            <div class="textarea-solution">
              <textarea placeholder="Написати коментар..." v-model="addCommentTextMessage.text"></textarea>
            </div>
          </div>

          <v-card-text>
            <app-button @click="sendComment = false; addCommentMessage()">Відправити коментар</app-button>
          </v-card-text>

        </v-card>
      </v-bottom-sheet>

<!--   BOTTOM SHEET FOR CHANGE COMMENT   -->
      <v-bottom-sheet v-model="changeComment" :scrim="false">
        <v-card class="solution-card" style="border-radius: 16px;">
          <v-card-title class="title-card">
            Редагувати коментар
          </v-card-title>

          <div class="solution-text-card">
            <div class="textarea-solution">
              <textarea placeholder="Редагувати коментар ..." v-model="textCommentUpdate.text"></textarea>
            </div>
          </div>

          <v-card-text>
            <app-button @click="changeComment = false; updateComment()">Зберегти</app-button>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>


<!--  BOTTOM SHEET FOR DELETE COMMENT    -->

      <v-bottom-sheet v-model="deleteCommentSheet" :scrim="false">
        <v-card class="solution-card" style="border-radius: 16px;">
          <v-card-title class="title-card">
            Видалити коментар?
          </v-card-title>

          <v-card-text >
            <app-button class="ma-0" @click="deleteCommentSheet = false; deleteComment()">Так</app-button>
            <app-button class="mt-2" @click="deleteCommentSheet = false">Ні</app-button>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>

    </ion-content>

  </ion-page>
</template>

<style scoped>
ion-content::part(background) {
  background: rgb(243, 233, 224);
}

.container {
  margin: 24px 16px 0 16px;


  .task-card {
    height: 112px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-radius: 16px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgb(254, 245, 235);

    .type-task-logo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      margin: 21px 16px;


    }

    .logo {
      width: 75px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 16px;
      box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
      background: rgb(254, 245, 235);
    }
  }
}

.description-task-card {
  margin: 0 16px 0 16px;
  display: flex;
  align-items: center;
  width: 65%;

  & p {
    font-size: 20px;
    font-weight: 600;
    line-height: 125%;
    text-align: left;
  }

  & .number-task {
    color: rgb(205, 150, 129);
  }

  & .title-task {
    color: rgb(66, 126, 154);
  }
}

.users-solution-card {
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  padding: 8px 16px;
  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(254, 245, 235);

  .deadline {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .deadline-title {
      color: rgb(66, 126, 154);
      font-size: 12px;
      font-weight: 400;
      line-height: 125%;
      text-align: left;
    }

    .deadline-date {
      color: rgb(58, 77, 83);
      font-size: 12px;
      font-weight: 400;
      line-height: 125%;
      text-align: left;
    }
  }

  .users {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;


    .avatars {
      display: flex;
      padding: 10px;

      .avatar {
        width: 42px;
        height: 42px;
        margin: 0px -6px;
        position: static;
        box-sizing: border-box;
        outline: 2px solid rgb(98, 145, 161);
        background: url(), rgb(254, 245, 235);
        border-radius: 50%;

      }
    }

    .avatar:first-child {
      box-sizing: border-box;
      outline: 2px solid rgb(255, 204, 77) !important;
      background: url(), rgb(254, 245, 235);
      border-radius: 50%;
    }
  }
}

.content-task {
  margin-top: 32px;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    border-radius: 16px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgba(0, 0, 0, 0.5), url();
  }
}

.description-task {
  margin-top: 16px;
  margin-bottom: 32px;
}

.send-solution {
  display: flex;
  justify-content: center;
  width: 100%;
}

.send-solution-btn {
  border-radius: 43px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(66, 126, 154);
  color: rgb(255, 248, 237);
  display: flex;
  width: 85%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  padding: 10px 34px 10px 34px;
  text-align: center;
  text-transform: none;
}

.speaking-with-teacher {
  margin-top: 32px;

  & h3 {
    color: rgb(66, 126, 154);
    font-size: 16px;
    font-weight: 600;
    line-height: 125%;
    text-align: center;
  }

  & .comment-card {
    margin-top: 16px;
    border-radius: 16px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgb(255, 248, 237);

    .user-info {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: flex-start;
      position: relative;

      .avatar-comment {
        padding: 16px;
        display: flex;
        align-items: center;

        .comment-info {
          display: flex;
          margin-left: 8px;
          flex-direction: column;
        }
      }
    }
  }
}

.menu-comment {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(-50%, -50%);
}

.name-user-comment {
  color: rgb(66, 126, 154);
  font-size: 16px;
  font-weight: 400;
  line-height: 125%;
  text-align: left;
}

.data-send-comment {
  font-size: 12px;
  font-weight: 400;
  line-height: 125%;
  text-align: left;
  color: rgb(58, 77, 83);
  margin-top: 4px;

}

.role-user {
  font-size: 12px;
  font-weight: 400;
  line-height: 125%;
  text-align: left;
  color: rgb(164, 202, 224);
  margin-top: 4px;
  margin-left: 2px;
}

.user-info:after {
  content: '';
  width: 100%;
  display: block;
  height: 2px;
  box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.15);
  background: rgb(255, 248, 237);
}


.comment-text-card {
  padding: 16px;

}


.speaking {
  margin-top: 32px;

  & h3 {
    color: rgb(66, 126, 154);
    font-size: 16px;
    font-weight: 600;
    line-height: 125%;
    text-align: center;
  }

  & .comment-card {
    margin-top: 16px;
    border-radius: 16px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgb(255, 248, 237);

    .user-info {
      display: flex;
      align-items: flex-start;
      flex-direction: column;
      justify-content: flex-start;

      .avatar-comment {
        padding: 16px;
        display: flex;
        align-items: center;

        .comment-info {
          display: flex;
          margin-left: 8px;
          flex-direction: column;
        }
      }
    }
  }
}

.solution-card {
  background: rgb(254, 245, 235);
  border-radius: 16px;
  position: absolute;
  width: 100%;
  bottom: 0;

  .title-card {
    text-align: center;
    margin: 24px 0;
    color: rgb(205, 150, 129);
    font-size: 22px;
    font-weight: 700;
    line-height: 27px;
  }

  .title-card:after {
    content: '';
    margin-top: 24px;
    width: 100%;
    display: block;
    height: 2px;
    box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.15);
    background: rgb(255, 248, 237);
  }
}

.solution-text-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 16px;

  .textarea-solution {
    box-sizing: border-box;
    border: 1px solid rgb(254, 245, 235);
    border-radius: 16px;
    margin: 8px 0px;
    box-shadow: inset 0px 4px 2px 0px rgba(0, 0, 0, 0.05), inset 0px -2px 1px 0px rgb(255, 255, 255);
    background: linear-gradient(180.00deg, rgb(255, 248, 237), rgb(255, 254, 253) 199.02%);

    & textarea::placeholder {
      color: rgb(164, 202, 224);

    }

    & textarea {
      width: 100%;
      outline: none;
      padding: 16px;
      color: rgb(66, 126, 154);
      font-size: 16px;
      font-weight: 400;
      height: 260px;
      line-height: 19px;
    }
  }

  & h3 {
    color: rgb(66, 126, 154);
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
  }
}

.images-card {
  display: flex;
  flex-direction: column;
  align-items: center;

  & h3 {
    color: rgb(66, 126, 154);
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    text-align: center;
    margin-bottom: 16px;
  }
}

.gallery {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow-x: auto;
  gap: 12px;
  width: 100%;
  padding: 0 10px;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.gallery::-webkit-scrollbar {
  display: none;
}

.image-block {
  min-width: 75px;
  min-height: 75px;

}

.image {
  padding: 4px;
  width: 75px;
  height: 75px;
  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: url(), rgb(254, 245, 235);

}

.send-solution-from-sheet {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 32px 0;
}

.send-solution-btn-from-sheet {
  color: rgb(255, 248, 237);
  width: 95%;
  text-transform: none;
  font-size: 16px;
  font-weight: 400;
  line-height: 19px;
  text-align: center;
  border-radius: 43px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px 34px 16px 34px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(66, 126, 154);
}

.user-avatar {
  border-radius: 34px;
  width: 48px;
  height: 48px;
  background: url(), rgb(182, 118, 118);

  .initials {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
}
.list-menu-comment{
  padding: 16px;
}
.list-item-menu-comment{
  text-align: center;
  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(255, 248, 237);
  padding: 5px 10px;
  margin: 10px 0;
  color: rgb(66, 126, 154);
}

</style>