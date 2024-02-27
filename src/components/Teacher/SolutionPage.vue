<script setup lang="ts">
import {IonContent, IonFooter, IonItem, IonPage, IonTextarea, IonInput, onIonViewWillEnter} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {computed, onMounted, reactive, ref} from "vue";
import DrawingCanvas from "@/components/parts/DrawingCanvas.vue";
import {solution} from "@/stores/solution";
import {message} from "@/stores/message";
import {MarkSolution} from "@/models/Solution";
import {comment} from "@/stores/comment";
import {add} from "ionicons/icons";
import {auth} from "@/stores/auth";
import {image} from "@/stores/image";

const SolutionStore = solution()
const MessageStore = message()
const CommentStore = comment()
const AuthStore = auth()
const changeComment = ref(false)
const group_solution = ref(false)
const studentsListDraft = ref(false)
const studentSelected = ref(false)
const studentsChecked = ref(false)
const deleteCommentSheet = ref(false)
const ImageStore = image()
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

const addCommentTextMessage = reactive({
  text: ''
})

const addCommentTextSolution = reactive({
  text: ''
})
const addCommentMessage = async () => {
  await CommentStore.commentMessage(MessageStore.msgId, addCommentTextMessage)
  addCommentTextMessage.text = ''
  await getCommentsMessage()
}

const textCommentUpdate = reactive({
  text: CommentStore.nowComment.text
})

const updateCommentMessage = async (changedText: string) => {
  await CommentStore.updateComment(CommentStore.commentId, {text: changedText})
  changeComment.value = false
  await getCommentsMessage()
  await getCommentSolution()

}
const getCommentsMessage = async () => {
  await CommentStore.findByMessageId(MessageStore.msgId)
}
getCommentsMessage()

const deleteCommentMessage = async () => {
  await CommentStore.deleteComment(CommentStore.commentId)
  deleteCommentSheet.value = false
  await getCommentsMessage()
  await getCommentSolution()
}

//Solution comment

const getCommentSolution = async () => {
  await CommentStore.findBySolutionId(SolutionStore.solutionId)
}
getCommentSolution()

const addCommentSolution = async () => {
  await CommentStore.commentSolution(SolutionStore.solutionId, addCommentTextSolution)
  addCommentTextSolution.text = ''
  await getCommentSolution()
}


function isFutureDate(targetDate) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  return targetDateTime > currentDate;
}

const formatDate = (dateString) => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isFutureDate(dateString)) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    return targetDate.toLocaleDateString('ua-UA', options);
  } else if (targetDate.toDateString() === today.toDateString()) {
    return 'Сьогодні';
  } else if (targetDate.toDateString() === yesterday.toDateString()) {
    return 'Вчора';
  } else {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    };
    return targetDate.toLocaleDateString('ua-UA', options);
  }
};


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
    textCommentUpdate.text = CommentStore.nowComment.text
    changeComment.value = true
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
            <p>Термін здачі </p>
            <p>{{ dayOfWeek() }} {{ formatDate(MessageStore.thisMessage.deadline) }}</p>
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

          <div class="horizontal_line"></div>


          <v-list>
            <v-list-item v-for="i in CommentStore.commentsMessage" class="comment_item">
              <div @click="CommentStore.commentId = i.id, CommentStore.nowComment = i" class="comment-wrapper"
                   :class="{ 'my-comment': AuthStore.user.user.id === i.userId, 'other-comment': AuthStore.user.user.id !== i.userId }">

                <div class="content-wrapper">

                  <div class="comment-text" :class="{'textMyComment' : AuthStore.user.user.id === i.userId}">
                    <div class="comment-header">

                      <div class="avatar-wrapper">
                        <v-avatar :style="{ backgroundColor: randomColor() }" v-if="AuthStore.user.user.id !== i.userId">
                          <img :src="image_URL+i.userAvatar" v-if='i.userAvatar !== ""'>
                          <span class="initials" v-else>{{ userInitials() }}</span>

                        </v-avatar>
                      </div>
                      <span class="user-name" v-if="AuthStore.user.user.id !== i.userId">{{i.userName}}</span>
                    </div>
                    <div class="text-block">
                      <p>{{ i.text }}</p>
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
              </div>
            </v-list-item>
          </v-list>



        </div>

      </div>

    </ion-content>

    <!--    FOOTER-->

    <ion-footer>

      <v-bottom-sheet v-model="changeComment">
        <v-card class="d-flex justify-center">
          <div class="d-flex align-center">
            <ion-item class="w-100">
              <ion-textarea
                  v-model="textCommentUpdate.text"
                  :rows="1"
                  :auto-grow="true"
                  placeholder="Напишіть коментар"
              >
              </ion-textarea>
            </ion-item>
            <v-btn class="bg-transparent" icon="mdi-send" elevation="0"
                   @click="updateCommentMessage(textCommentUpdate.text)"></v-btn>
          </div>
        </v-card>
      </v-bottom-sheet>

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
                    <v-btn @click="deleteCommentMessage()">Так</v-btn>
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


      <div class="d-flex align-center">
        <ion-item class="w-100">
          <ion-textarea
              v-model="addCommentTextMessage.text"
              :rows="1"
              :auto-grow="true"
              placeholder="Напишіть коментар"
          >
          </ion-textarea>
        </ion-item>
        <v-btn class="bg-transparent" icon="mdi-send" elevation="0" @click="addCommentMessage()"></v-btn>
      </div>

      <div class="text-center">
        <v-bottom-sheet v-model="group_solution">
          <v-card height="850">
            <div class="solution_student" v-if="SolutionStore.submittedSolutionsId.length > 0">
              <div class="pb-3 ma-6">
                <p>{{ SolutionStore.nowSolution.description }}</p>
              </div>
              <div class="solution_img_container">
                <div class="images_block" v-for="i of SolutionStore.nowSolution.images">
                  <v-img class="solution_img" :src='image_URL+i.name' alt="Solution"
                         @click="imageChange = !imageChange; SolutionStore.imageURL = image_URL+i.name; ImageStore.imgId = i.id"></v-img>
                </div>
              </div>

              <ion-content class="h-50">
                <v-list>
                  <v-list-item v-for="i in CommentStore.commentsSolution" class="comment_item">
                    <div @click="CommentStore.commentId = i.id, CommentStore.nowComment = i" class="comment-wrapper"
                         :class="{ 'my-comment': AuthStore.user.user.id === i.userId, 'other-comment': AuthStore.user.user.id !== i.userId }">
                      <div class="content-wrapper">
                        <div class="comment-text" :class="{'textMyComment' : AuthStore.user.user.id === i.userId}">
                          <div class="text-block">
                            <p>{{ i.text }}</p>
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
                    </div>
                  </v-list-item>
                </v-list>
              </ion-content>

              <div class="result_solution">
                <div class="mark_solution">
                  <div class="comment_for_solution">
                    <ion-item class="w-100">
                      <ion-textarea
                          :rows="1"
                          v-model="addCommentTextSolution.text"
                          :auto-grow="true"
                          placeholder="Напишіть коментар"
                      >
                      </ion-textarea>
                      <v-btn icon="mdi-send" elevation="0" @click="addCommentSolution()"></v-btn>
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
  margin: 10px;
  border-radius: 15px;

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

.textMyComment {
  text-align: right;
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

.horizontal_line {
  height: 2px;
  background: grey;
  width: 100%;
}

.initials{
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}
</style>