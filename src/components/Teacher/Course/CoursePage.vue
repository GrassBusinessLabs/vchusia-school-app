<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

    <ion-content>
      <div class="course">
        <div class="image-course">
          <img src="../../../assets/img.png">
        </div>

        <div class="course-card-description">
          <h5>{{ CourseStore.thisCourse.discipline }}</h5>
          <p>Автори: <span>Іван Петренко, Олена Іванова</span></p>
          <p>Рік видання: <span>2023</span></p>
          <p>Дата оновлення: <span>18.10.2023</span></p>
          <p>Викладач: <span>Марина Ковальчук</span></p>
        </div>


        <div class="card-counter">
          <div class="info-counter-course">8 тем</div>
          <div class="info-counter-course">45 завдань</div>
          <div class="info-counter-course">14 годин</div>
        </div>
      </div>

      <div class="card-task">
        <div class="title-task">
          <h3>Введення в світ програмування: Основні поняття та історія</h3>
        </div>

        <div class="grid" >
          <div class="row" v-for="i of 2">
            <div class="col"><player /></div>
            <div class="col"><read-book/></div>
            <div class="col"><pencil/></div>
            <div class="col"><read-book-active/></div>
          </div>
        </div>
      </div>

      <div class="card-task">
        <div class="title-task">
          <h3 class="title-task-active">Робота зі змінними та базові типи даних в програмуванні</h3>
        </div>

        <div class="grid" >
          <div class="row">
            <div class="col"><player-active/></div>
            <div class="col"><read-book-active/></div>
            <div class="col"><pencil-active/></div>
            <div class="col"><pencil-active/></div>
          </div>
        </div>
      </div>
    </ion-content>

<!--    <ion-content>-->


<!--      <div v-for="value in CourseStore.thisCourse" class="course">-->


<!--        <div class="content_course">-->
<!--          <div v-for="(name, value, index) in value"-->
<!--               v-show="value !== 'id' && value !== 'userid' && value !== 'Завдання' && value !== 'Опис курсу'"-->
<!--               class="titlesCourse">-->
<!--            {{ value = nameCourse[index] }} <span class="valueCourse"> {{ name }} </span>-->
<!--          </div>-->
<!--          <b> Ідентифікатор курсу: <span class="valueCourse">{{ identifier }}</span></b>-->
<!--        </div>-->

<!--        <div class="setting_course">-->
<!--          <v-btn icon="mdi-cog-outline" class="btn_setting_course" elevation="0"-->
<!--                 @click="router.replace('/main/setting')"></v-btn>-->
<!--        </div>-->
<!--      </div>-->


<!--      <v-card class="ma-6" elevation="0" >-->
<!--        <div class="groups_tab">-->
<!--          Групи-->
<!--        </div>-->

<!--      </v-card>-->


<!--          <p v-show="CourseStore.groupsInCourse.length < 1" class="text-center">Групи не прив'язані</p>-->

<!--          <v-layout>-->
<!--            <v-card class="card_groups mx-auto d-flex justify-center align-center" elevation="0">-->
<!--              <v-list class="list_groups_in_course">-->
<!--                <v-list-item v-for="i of CourseStore.groupsInCourse" :title="i.name" class="item_group_in_course" @click="$router.replace('/tape/tape'), GroupStore.idGroup = i.id"></v-list-item>-->
<!--              </v-list>-->
<!--            </v-card>-->
<!--          </v-layout>-->
<!--    </ion-content>-->


<!--    <ion-footer>-->

<!--      <div class="sheet_parent">-->
<!--        <v-bottom-sheet v-model="sheet_parent">-->
<!--          <v-card height="750" class="drawSheetParent">-->
<!--            <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">-->

<!--            <div class="selectPost">-->
<!--              <v-select-->
<!--                  v-show="r > 1"-->
<!--                  variant="outlined"-->
<!--                  prepend-icon="mdi-identifier"-->
<!--                  label="Id"-->
<!--                  :items=items-->
<!--                  v-model="task$.parentId"-->
<!--              ></v-select>-->
<!--            </div>-->


<!--            <v-card-text>-->


<!--              <div>-->

<!--                <v-select-->
<!--                    label="Тип"-->
<!--                    :items="[{type: 'Post', name: 'Пост'}, {type: 'Task', name: 'Завдання'}]"-->
<!--                    item-title="type"-->
<!--                    variant="outlined"-->
<!--                    color="primary"-->
<!--                    v-model="task$.type"-->
<!--                    prepend-icon="mdi-file-tree"-->
<!--                >-->
<!--                  <template v-slot:item="{ props, item }">-->
<!--                    <v-list-item v-bind="props" :subtitle="item.raw.name"></v-list-item>-->
<!--                  </template>-->
<!--                </v-select>-->

<!--                <v-text-field-->
<!--                    class="inputTaskStyled"-->
<!--                    variant="outlined"-->
<!--                    label="Заголовок"-->
<!--                    prepend-icon="mdi-bookmark-outline"-->
<!--                    color="primary"-->
<!--                    v-model="task$.title"-->


<!--                >-->
<!--                </v-text-field>-->

<!--                <v-text-field-->
<!--                    class="inputTaskStyled"-->
<!--                    variant="outlined"-->
<!--                    label="Опис завдання"-->
<!--                    color="primary"-->
<!--                    prepend-icon="mdi-information-outline"-->
<!--                    v-model="task$.description"-->


<!--                >-->
<!--                </v-text-field>-->

<!--                <v-text-field-->
<!--                    class="inputTaskStyled"-->
<!--                    variant="outlined"-->
<!--                    label="Відповідь"-->
<!--                    color="primary"-->
<!--                    prepend-icon="mdi-forum"-->
<!--                    v-model="task$.answer"-->
<!--                    v-show="task$.type === 'Завдання'"-->


<!--                >-->
<!--                </v-text-field>-->

<!--                <v-text-field-->
<!--                    class="inputTaskStyled"-->
<!--                    type="number"-->
<!--                    variant="outlined"-->
<!--                    label="Кількість балів"-->
<!--                    color="primary"-->
<!--                    prepend-icon="mdi-star"-->
<!--                    v-model="task$.points"-->
<!--                    v-show="task$.type === 'Завдання'"-->


<!--                >-->
<!--                </v-text-field>-->

<!--                <v-text-field-->
<!--                    class="inputTaskStyled"-->
<!--                    type="datetime-local"-->
<!--                    variant="outlined"-->
<!--                    label="Дата здачі"-->
<!--                    color="primary"-->
<!--                    prepend-icon="mdi-calendar-range"-->
<!--                    v-model="task$.deadline"-->


<!--                >-->
<!--                </v-text-field>-->

<!--                <v-select-->
<!--                    :items="['blue', 'red', 'yellow', 'green']"-->
<!--                    variant="outlined"-->
<!--                    label="Колір завдання"-->
<!--                    density="compact"-->
<!--                    prepend-icon="mdi-palette"-->
<!--                    v-model="task$.color"-->
<!--                ></v-select>-->

<!--                <div class="btnAddPostParent">-->
<!--                  <v-btn prepend-icon="mdi-plus-circle" class="btnAddTaskParent" id="btnAddTask" variant="tonal"-->
<!--                         color="indigo"-->
<!--                         @click="sheet_parent = !sheet_parent, createPost()">-->
<!--                    Додати завдання-->
<!--                  </v-btn>-->
<!--                </div>-->


<!--              </div>-->

<!--            </v-card-text>-->


<!--          </v-card>-->
<!--        </v-bottom-sheet>-->
<!--      </div>-->

<!--      <div class="text-center">-->
<!--        <v-bottom-sheet v-model="sheet_read">-->
<!--          <v-card height="500" :subtitle="PostStore.info.type" class="text-center">-->
<!--            <v-card-subtitle>-->
<!--              {{ PostStore.info.id }}-->
<!--              <div class="color_post_read" :style="{backgroundColor: PostStore.info.color}"></div>-->
<!--            </v-card-subtitle>-->

<!--            <v-card-title class="font-weight-bold">-->
<!--              {{ PostStore.info.title }}-->
<!--            </v-card-title>-->


<!--            <v-card-text class="d-flex justify-center flex-column align-center">-->
<!--              <small>Опис завдання</small>-->
<!--              {{ PostStore.info.description }}-->
<!--            </v-card-text>-->

<!--            <v-card-text>-->
<!--            </v-card-text>-->

<!--            <v-card-text>-->
<!--              Оцінка за завдання <i>{{ PostStore.info.points }}</i> <br>-->

<!--              Виконати до <b>{{ PostStore.info.deadline }}</b>-->

<!--              <div>-->
<!--                <v-btn prepend-icon="mdi-share-all-outline" color="teal-accent-1" class="ma-6"-->
<!--                       @click="sharePostOpenSheet()">-->
<!--                  Поділитись постом-->
<!--                </v-btn>-->
<!--              </div>-->
<!--            </v-card-text>-->


<!--          </v-card>-->
<!--        </v-bottom-sheet>-->
<!--      </div>-->

      <!--      <div class="text-center">-->
      <!--        <v-bottom-sheet v-model="sheet_sharePost">-->
      <!--          <v-card height="550">-->
      <!--            <v-card-text>-->
      <!--              <v-select-->
      <!--              :items="groups"-->
      <!--              multiple-->
      <!--              variant="outlined"-->
      <!--              label="Групи"-->
      <!--              v-model="sharePostBody.groups"-->
      <!--              >-->
      <!--              </v-select>-->

      <!--              <v-text-field-->
      <!--                label="Коментар"-->
      <!--                variant="outlined"-->
      <!--                v-model="sharePostBody.comment"-->

      <!--              >-->
      <!--              </v-text-field>-->

      <!--              <v-text-field-->
      <!--                label="Дата здачі"-->
      <!--                variant="outlined"-->
      <!--                type="datetime-local"-->
      <!--                v-model="sharePostBody.deadline"-->

      <!--              >-->
      <!--              </v-text-field>-->

      <!--              <div class="btnShare">-->
      <!--                <v-btn class="btn_share_post" @click="sharePost()">-->
      <!--                  Пошарити-->
      <!--                </v-btn>-->
      <!--              </div>-->

      <!--            </v-card-text>-->
      <!--          </v-card>-->
      <!--        </v-bottom-sheet>-->
      <!--      </div>-->

<!--      <div class="text-center">-->
<!--        <v-dialog-->
<!--            v-model="dialog"-->
<!--            activator="parent"-->
<!--            width="auto"-->
<!--        >-->
<!--          <v-card>-->
<!--            <v-card-text>-->
<!--              &lt;!&ndash;                <v-select&ndash;&gt;-->
<!--              &lt;!&ndash;                    :items="groups"&ndash;&gt;-->
<!--              &lt;!&ndash;                    variant="outlined"&ndash;&gt;-->
<!--              &lt;!&ndash;                    label="Групи"&ndash;&gt;-->
<!--              &lt;!&ndash;                    v-model="sharePostBody.groups"&ndash;&gt;-->
<!--              &lt;!&ndash;                >&ndash;&gt;-->
<!--              &lt;!&ndash;                </v-select>&ndash;&gt;-->
<!--              <v-select-->
<!--                  :items="groups"-->
<!--                  item-title="id"-->
<!--                  variant="outlined"-->
<!--                  label="Групи"-->
<!--                  multiple-->
<!--                  v-model="sharePostBody.groups"-->
<!--              >-->
<!--                <template v-slot:item="{ props, item }">-->
<!--                  <v-list-item v-bind="props" :subtitle="item.raw.name"></v-list-item>-->
<!--                </template>-->
<!--              </v-select>-->

<!--              <v-text-field-->
<!--                  label="Коментар"-->
<!--                  variant="outlined"-->
<!--                  v-model="sharePostBody.comment"-->

<!--              >-->
<!--              </v-text-field>-->

<!--              <v-text-field-->
<!--                  label="Дата здачі"-->
<!--                  variant="outlined"-->
<!--                  type="datetime-local"-->
<!--                  v-model="sharePostBody.deadline"-->

<!--              >-->
<!--              </v-text-field>-->

<!--              <div class="btnShare">-->
<!--                <v-btn class="btn_share_post" @click="sharePost()">-->
<!--                  Поділитися-->
<!--                </v-btn>-->
<!--              </div>-->

<!--            </v-card-text>-->
<!--            <v-card-actions>-->
<!--              <v-btn color="primary" block @click="dialog = false">Закрити</v-btn>-->
<!--            </v-card-actions>-->
<!--          </v-card>-->
<!--        </v-dialog>-->
<!--      </div>-->
<!--    </ion-footer>-->


  </ion-page>
</template>

<script lang="ts" setup>
import {
  IonPage,
  IonHeader,
  IonContent,
  IonFooter,
  IonCol,
  IonGrid,
  IonMenuButton,
  IonRow,

} from "@ionic/vue";


import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import router from "@/router";
import {course} from "@/stores/course";
import {onMounted, reactive, ref} from "vue";
import {Course} from "@/models/Course";
import {Post, sharePost, UpdatePost} from "@/models/Post";
import {post} from "@/stores/post";
import PostGrid from '/src/components/Teacher/Course/PostGrid.vue';
import {reload} from "ionicons/icons";
import logger from "api/dist/cli/logger";
import {group} from "@/stores/group";
import Feed from "@/components/icons/feed.vue";
import Player from "@/components/icons/player.vue";
import ReadBook from "@/components/icons/read-book.vue";
import Pencil from "@/components/icons/pencil.vue";
import ReadBookActive from "@/components/icons/read-book-active.vue";
import PlayerActive from "@/components/icons/player-active.vue";
import PencilActive from "@/components/icons/pencil-active.vue";


const CourseStore = course();
const nameCourse = ['id', 'userid', 'Курс', 'Назва курсу', 'Клас', 'Вік від', 'Вік до', 'Опис курсу', 'Завдання', 'Ідентифікатор' ];
const identifier = localStorage.getItem('identifier');
const parentGrid = document.querySelector('.parentGrid');
const courseId = localStorage.getItem('courseId');
const displayPost = ref(false)
let sheet_change_post = ref(false)
let sheet = ref(false);
let r, c;
const tab = ref('posts')
const dialog = ref(false)
let sheet_change = ref(false);
let sheet_parent = ref(false);
let sheet_sharePost = ref(false)
const PostStore = post();
const GroupStore = group()
let allPost = JSON.parse(localStorage.getItem('allPost'));
let items: any = []
const outlineNone = ref('none')
const outlinePost = ref('1px solid grey')
let switchMode = ref(true)
let sheet_read = ref(false)
let groups: any = []
let sharePostBody = reactive({
  groups: null,
  comment: "",
  deadline: ""
})

let courseUpdate = reactive({
  name: "",
  discipline: "",
  grade: null,
  yearsFrom: null,
  yearsTo: null,

})
PostStore.PostInfo = [];

let typePost = reactive({
  type: {
    type: 'Post', name: 'Пост'
  }
})


let task$ = reactive({
  courseId: Number(courseId),
  title: "",
  description: "",
  answer: "",
  points: 10,
  deadline: "",
  parentId: 0,
  requiredPoints: 0,
  color: "",
  type: typePost.type.type
})

async function createPost() {
  const body: Post = {
    title: task$.title,
    description: task$.description,
    answer: task$.answer,
    points: +task$.points,
    deadline: new Date(task$.deadline).toISOString(),
    parentId: Number(task$.parentId),
    requiredPoints: task$.requiredPoints,
    row: r,
    column: c,
    color: task$.color,
    type: task$.type
  }

  task$.answer = "";
  task$.title = "";
  task$.description = "";
  task$.deadline = "";


  PostStore.createPost(body);

}

// const updateCourse = () => {
//   const changedCourse: Course = {
//     name: courseUpdate.name,
//     discipline: courseUpdate.discipline,
//     grade: +courseUpdate.grade,
//     yearsFrom: +courseUpdate.yearsFrom,
//     yearsTo: +courseUpdate.yearsTo
//   }
//
//   CourseStore.updateCourse(changedCourse)
//
//   courseUpdate.name = "";
//   courseUpdate.discipline = "";
//   courseUpdate.grade = null;
//   courseUpdate.yearsFrom = null;
//   courseUpdate.yearsTo = null;
//
// }

// const deletePost = () => {
//   PostStore.deletePost()
//   sheet_change_post.value = false
// }

const sharePostOpenSheet = () => {
  sheet_read.value = false
  dialog.value = true
  groups = []
  for (let i of GroupStore.allGroups) {
    for (let j of i) {
      groups.push({id: j.id, name: j.name})
    }
  }
}
const sharePost = () => {
  const body: sharePost = {
    groups: sharePostBody.groups,
    comment: sharePostBody.comment,
    deadline: new Date(sharePostBody.deadline).toISOString()
  }
  PostStore.sharePost(body)
  dialog.value = false
}

// const updatePost = () => {
//   const body: UpdatePost = {
//     title: PostStore.info.title,
//     description: PostStore.info.description,
//     answer: PostStore.info.answer,
//     points: +PostStore.info.points,
//     deadline: new Date(task$.deadline).toISOString(),
//     requiredPoints: PostStore.info.requiredPoints,
//     type: PostStore.info.type,
//     color: PostStore.info.color
//   }
//
//   PostStore.updatePost(body)
//   sheet_change_post.value = false
// }


// const deleteCourse = () => {
//   CourseStore.deleteCourse()
//   router.replace('/main/courses')
// }

const loadCourse = () => {
  CourseStore.thisCourse = []
  console.log(CourseStore.findCourseById())
}

const getPostByCords = (row: any, column: any) => {
  return PostStore.PostInfo.find(post => post.row === row && post.column === column)
}

const mapPosts = () => {
  const rows = PostStore.PostInfo.map(post => post.row)
  const uniqueSet = Array.from(new Set(rows))
  const mappedUniqueSet = uniqueSet.map(row => {
    return {
      row: row,
      groups: PostStore.PostInfo.filter(item => item.row === row)
    }
  })
  return mappedUniqueSet
}

const handlePost = (row: any, column: any) => {

  let idPost
  if (getPostByCords(row + 1, column)) {

    if (switchMode.value === true) {
      sheet_read.value = true
      for (let i of PostStore.PostInfo) {
        if (row + 1 === i.row && column === i.column) {
          console.log(i.id)
          idPost = i.id
          PostStore.idPostsNow = i.id
          PostStore.info = i
        }
      }
    } else {
      GroupStore.allGroups = []
      // sheet_change_post.value = true
      GroupStore.getCreatedGroupsList()

      console.log('edit create')
      for (let i of PostStore.PostInfo) {
        if (row + 1 === i.row && column === i.column) {
          console.log(i.id)
          idPost = i.id
          PostStore.idPostsNow = i.id
          PostStore.info = i
        }
      }
    }


  } else {
    items = []
    task$.parentId = null;
    for (let i of PostStore.PostInfo) {
      if (i.row === row) {
        items.push(i.id)
      }
    }
    r = row + 1;
    c = column

  }
  return idPost, r, c, items

}

const createNewPost = (column) => {
  const rows = PostStore.PostInfo.map(post => post.row)
  const uniqueSet = Array.from(new Set(rows))
  console.log(Math.max(...uniqueSet) + 1)
  console.log(rows)
  if (rows.length === 0) {
    r = 1
  } else {
    items = []
    r = Math.max(...uniqueSet) + 1;
    for (let i of PostStore.PostInfo) {
      if (i.row === r - 1) {
        items.push(i.id)
      }
    }
  }
  c = column
  return r, c
}

loadCourse();
PostStore.findPostWithRow()
CourseStore.groupsByCourseId()
</script>

<style scoped>

ion-content::part(background) {
  background: rgb(243, 233, 224);
}

.course{
  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(254, 245, 235);
  margin: 18px;
  padding-bottom: 24px;

  .image-course {
    margin: 2px 2px 0 2px;
    border-radius: 14px 14px 0px 0px;

    & img {
      margin-top: 2px;
      width: 100%;
    }
  }
}

.course-card-description {
  margin: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  & h5 {
    color: rgb(66, 126, 154);
    font-size: 16px;
    margin-top: 0;
    font-weight: 600;
    line-height: 19px;
    text-align: left;
  }

  & span {
    color: rgb(58, 77, 83);
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: left;
    margin: 0px 8px;
    order: 1;

  }

  & p {
    color: rgb(98, 145, 161);
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: left;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 4px 0;

  }
}

.card-counter {
  margin: 2px 16px 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  height: 31px;
  flex-wrap: wrap;

  & .info-counter-course {
    position: static;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 8px 16px 8px 16px;
    color: rgb(255, 248, 237);
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    text-align: center;
    border-radius: 16px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgb(66, 126, 154);
  }

}

.card-task{
  margin: 16px;
  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5),inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25),0px 4px 8px 0px rgba(169, 163, 157, 0.25),0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(254, 245, 235);



  & .title-task h3{
    padding: 14px 16px 15px 16px;
    color: rgb(205, 150, 129);
    font-size: 16px;
    font-weight: 600;
    line-height: 19px;
    text-align: left;
  }

  & .title-task:after{
    content: '';
    width: 100%;
    display: block;
    height: 2px;
    box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.15);
    background: rgb(255, 248, 237);
  }

}

.grid{
  width: 100%;
  padding-bottom: 16px;
}
.row{
  display: grid;
  grid-template-columns: auto auto auto auto;
  padding: 8px 17px 0 17px;

  & .col{
    border-radius: 16px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5),inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25),0px 4px 8px 0px rgba(169, 163, 157, 0.25),0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgb(254, 245, 235);
    margin: 8px;
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
}

.title-task-active {
  color: rgb(66, 126, 154) !important;
  padding: 14px 16px 15px 16px;
  font-size: 16px;
  font-weight: 600;
  line-height: 19px;
  text-align: left;
}
</style>