<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">


    <ion-content>


      <div v-for="value in CourseStore.thisCourse" class="course">


        <div class="content_course">
          <div v-for="(name, value, index) in value"
               v-show="value !== 'id' && value !== 'userid' && value !== 'Завдання' && value !== 'Опис курсу'"
               class="titlesCourse">
            {{ value = nameCourse[index] }} <span class="valueCourse"> {{ name }} </span>
          </div>
          <b> Ідентифікатор курсу: <span class="valueCourse">{{ identifier }}</span></b>
        </div>

        <div class="setting_course">
          <v-btn icon="mdi-cog-outline" class="btn_setting_course" elevation="0"
                 @click="router.replace('/main/setting')"></v-btn>
        </div>
      </div>


      <v-card class="ma-6" elevation="0" >
        <div class="groups_tab">
          Групи
        </div>

      </v-card>


          <p v-show="CourseStore.groupsInCourse.length < 1" class="text-center">Групи не прив'язані</p>

          <v-layout>
            <v-card class="card_groups mx-auto d-flex justify-center align-center" elevation="5">
              <v-list class="list_groups_in_course">
                <v-list-item v-for="i of CourseStore.groupsInCourse" :title="i.name" class="item_group_in_course" @click="$router.push('/tape/tape'), GroupStore.idGroup = i.id"></v-list-item>
              </v-list>
            </v-card>
          </v-layout>
    </ion-content>


    <ion-footer>
<!--      <div class="text-center">-->
<!--        <v-bottom-sheet v-model="sheet_change">-->
<!--          <v-card-->
<!--              class="text-center"-->
<!--              height="700"-->
<!--          >-->
<!--            <v-card-text>-->
<!--              <br>-->
<!--              <br>-->
<!--              <div>-->
<!--                <v-text-field-->
<!--                    class="input-course"-->
<!--                    color="primary"-->
<!--                    label="Назва курсу"-->
<!--                    variant="outlined"-->
<!--                    prepend-icon="mdi-book-outline"-->
<!--                    v-model="courseUpdate.name">-->
<!--                </v-text-field>-->

<!--                <v-text-field-->
<!--                    class="input-course"-->
<!--                    v-model="courseUpdate.discipline"-->
<!--                    color="primary"-->
<!--                    label="Назва дисципліни"-->
<!--                    prepend-icon="mdi-information-outline"-->

<!--                    variant="outlined">-->

<!--                </v-text-field>-->

<!--                <v-text-field-->
<!--                    class="input-course"-->
<!--                    v-model="courseUpdate.grade"-->
<!--                    color="primary"-->
<!--                    label="Клас"-->
<!--                    prepend-icon="mdi-google-classroom"-->
<!--                    variant="outlined">-->

<!--                </v-text-field>-->

<!--                <v-text-field-->
<!--                    class="input-course"-->
<!--                    v-model="courseUpdate.yearsFrom"-->
<!--                    color="primary"-->
<!--                    label="Вік від"-->
<!--                    prepend-icon="mdi-account-child-outline"-->
<!--                    variant="outlined">-->


<!--                </v-text-field>-->

<!--                <v-text-field-->
<!--                    class="input-course"-->
<!--                    v-model="courseUpdate.yearsTo"-->
<!--                    color="primary"-->
<!--                    prepend-icon="mdi-human-child"-->
<!--                    label="Вік до"-->
<!--                    variant="outlined"-->
<!--                >-->
<!--                </v-text-field>-->


<!--                <v-btn class="btnAddCourse" variant="tonal" color="indigo"-->
<!--                       @click="updateCourse">-->
<!--                  Змінити курс-->
<!--                </v-btn>-->

<!--              </div>-->
<!--            </v-card-text>-->
<!--          </v-card>-->
<!--        </v-bottom-sheet>-->
<!--      </div>-->


<!--      <div class="text-center d-flex">-->
<!--        <v-bottom-sheet v-model="sheet_change_post">-->
<!--          <v-card height="750">-->

<!--            <v-card-text>-->
<!--              <v-select-->
<!--                  label="Тип завдання"-->
<!--                  :items="['Пост', 'Завдання']"-->
<!--                  variant="outlined"-->
<!--                  color="primary"-->
<!--                  v-model="PostStore.info.type"-->
<!--                  prepend-icon="mdi-file-tree"-->
<!--              >-->

<!--              </v-select>-->

<!--              <v-text-field-->
<!--                  class="inputTaskStyled"-->
<!--                  variant="outlined"-->
<!--                  label="Заголовок"-->
<!--                  prepend-icon="mdi-bookmark-outline"-->
<!--                  color="primary"-->
<!--                  v-model="PostStore.info.title"-->
<!--              >-->
<!--              </v-text-field>-->

<!--              <v-text-field-->
<!--                  class="inputTaskStyled"-->
<!--                  variant="outlined"-->
<!--                  label="Опис завдання"-->
<!--                  color="primary"-->
<!--                  prepend-icon="mdi-information-outline"-->
<!--                  v-model="PostStore.info.description"-->


<!--              >-->
<!--              </v-text-field>-->

<!--              <v-text-field-->
<!--                  class="inputTaskStyled"-->
<!--                  variant="outlined"-->
<!--                  label="Відповідь"-->
<!--                  color="primary"-->
<!--                  prepend-icon="mdi-forum"-->
<!--                  v-model="PostStore.info.answer"-->


<!--              >-->
<!--              </v-text-field>-->

<!--              <v-text-field-->
<!--                  class="inputTaskStyled"-->
<!--                  type="number"-->
<!--                  variant="outlined"-->
<!--                  label="Кількість балів"-->
<!--                  color="primary"-->
<!--                  prepend-icon="mdi-star"-->
<!--                  v-model="PostStore.info.points"-->


<!--              >-->
<!--              </v-text-field>-->

<!--              <v-text-field-->
<!--                  class="inputTaskStyled"-->
<!--                  type="datetime-local"-->
<!--                  variant="outlined"-->
<!--                  label="Дата здачі"-->
<!--                  color="primary"-->
<!--                  prepend-icon="mdi-calendar-range"-->
<!--                  v-model="task$.deadline"-->


<!--              >-->
<!--              </v-text-field>-->

<!--              <v-select-->
<!--                  :items="['blue', 'red', 'yellow', 'green']"-->
<!--                  variant="outlined"-->
<!--                  label="Колір завдання"-->
<!--                  density="compact"-->
<!--                  prepend-icon="mdi-palette"-->
<!--                  v-model="PostStore.info.color"-->
<!--              ></v-select>-->

<!--              <div class="btn_changes_post">-->
<!--                <v-btn class="btn_change_post" color="#9C27B0" @click="updatePost()">-->
<!--                  Редагувати-->
<!--                </v-btn>-->

<!--                <v-btn class="btn_del_post" color="#F44336" @click="deletePost()">-->
<!--                  Видалити-->
<!--                </v-btn>-->

<!--                <v-btn class="btn_del_post" color="yellow" @click="sharePostOpenSheet()">-->
<!--                  Пошарити пост-->
<!--                </v-btn>-->
<!--              </div>-->

<!--            </v-card-text>-->


<!--          </v-card>-->
<!--        </v-bottom-sheet>-->
<!--      </div>-->

      <div class="sheet_parent">
        <v-bottom-sheet v-model="sheet_parent">
          <v-card height="750" class="drawSheetParent">
            <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

            <div class="selectPost">
              <v-select
                  v-show="r > 1"
                  variant="outlined"
                  prepend-icon="mdi-identifier"
                  label="Id"
                  :items=items
                  v-model="task$.parentId"
              ></v-select>
            </div>


            <v-card-text>


              <div>

                <v-select
                    label="Тип"
                    :items="[{type: 'Post', name: 'Пост'}, {type: 'Task', name: 'Завдання'}]"
                    item-title="type"
                    variant="outlined"
                    color="primary"
                    v-model="task$.type"
                    prepend-icon="mdi-file-tree"
                >
                  <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :subtitle="item.raw.name"></v-list-item>
                  </template>
                </v-select>

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
                    v-show="task$.type === 'Завдання'"


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
                    v-show="task$.type === 'Завдання'"


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

                <v-select
                    :items="['blue', 'red', 'yellow', 'green']"
                    variant="outlined"
                    label="Колір завдання"
                    density="compact"
                    prepend-icon="mdi-palette"
                    v-model="task$.color"
                ></v-select>

                <div class="btnAddPostParent">
                  <v-btn prepend-icon="mdi-plus-circle" class="btnAddTaskParent" id="btnAddTask" variant="tonal"
                         color="indigo"
                         @click="sheet_parent = !sheet_parent, createPost()">
                    Додати завдання
                  </v-btn>
                </div>


              </div>

            </v-card-text>


          </v-card>
        </v-bottom-sheet>
      </div>

      <div class="text-center">
        <v-bottom-sheet v-model="sheet_read">
          <v-card height="500" :subtitle="PostStore.info.type" class="text-center">
            <v-card-subtitle>
              {{ PostStore.info.id }}
              <div class="color_post_read" :style="{backgroundColor: PostStore.info.color}"></div>
            </v-card-subtitle>

            <v-card-title class="font-weight-bold">
              {{ PostStore.info.title }}
            </v-card-title>


            <v-card-text class="d-flex justify-center flex-column align-center">
              <small>Опис завдання</small>
              {{ PostStore.info.description }}
            </v-card-text>

            <v-card-text>
            </v-card-text>

            <v-card-text>
              Оцінка за завдання <i>{{ PostStore.info.points }}</i> <br>

              Виконати до <b>{{ PostStore.info.deadline }}</b>

              <div>
                <v-btn prepend-icon="mdi-share-all-outline" color="teal-accent-1" class="ma-6"
                       @click="sharePostOpenSheet()">
                  Поділитись постом
                </v-btn>
              </div>
            </v-card-text>


          </v-card>
        </v-bottom-sheet>
      </div>

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

      <div class="text-center">
        <v-dialog
            v-model="dialog"
            activator="parent"
            width="auto"
        >
          <v-card>
            <v-card-text>
              <!--                <v-select-->
              <!--                    :items="groups"-->
              <!--                    variant="outlined"-->
              <!--                    label="Групи"-->
              <!--                    v-model="sharePostBody.groups"-->
              <!--                >-->
              <!--                </v-select>-->
              <v-select
                  :items="groups"
                  item-title="id"
                  variant="outlined"
                  label="Групи"
                  multiple
                  v-model="sharePostBody.groups"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props" :subtitle="item.raw.name"></v-list-item>
                </template>
              </v-select>

              <v-text-field
                  label="Коментар"
                  variant="outlined"
                  v-model="sharePostBody.comment"

              >
              </v-text-field>

              <v-text-field
                  label="Дата здачі"
                  variant="outlined"
                  type="datetime-local"
                  v-model="sharePostBody.deadline"

              >
              </v-text-field>

              <div class="btnShare">
                <v-btn class="btn_share_post" @click="sharePost()">
                  Поділитися
                </v-btn>
              </div>

            </v-card-text>
            <v-card-actions>
              <v-btn color="primary" block @click="dialog = false">Закрити</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </ion-footer>


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
.course {
  text-align: left;
  padding: 15px;
  width: 80%;
  margin: 15px auto;
  color: gray;
  background: rgb(223, 226, 216);
  background: linear-gradient(110deg, rgba(223, 226, 216, 1) 0%, rgba(225, 255, 249, 1) 100%);
  border-radius: 15px;
  outline: cyan 1px ridge;
  display: flex;


}

.titlesCourse {
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.btn {
  margin: 10px 0;
  width: 90%;
  border-radius: 15px;
}

.valueCourse {
  color: darkmagenta;
  font-size: 18px;
  font-family: "Fira Code Medium", monospace;
}

.layout-footer {
  max-height: 10vh;
}

.grid_post {
  width: 100%;
}

ion-col {
  background-color: #fff;
  outline: 1px solid grey;
  height: 48.5px;
  border-radius: 30px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48.5px;
  margin: 5px;
  overflow: hidden;
}

.selectPost {
  margin: 15px 25px 0 25px;
}

.btnAddTaskParent {
  display: flex;
  justify-content: center;

}

.btnAddPostParent {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn_changes_post {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.btn_change_post, .btn_del_post {
  width: 80%;
  margin: 10px;
  color: #fff;
}

.color_post_read {
  width: 20px;
  height: 20px;
  margin: 10px auto;
  border-radius: 50px;
}

.btnShare {
  display: flex;
  justify-content: center;
}

.btn_share_post {
  width: 85%;
  background: rgb(85, 255, 216);
  background: linear-gradient(207deg, rgba(85, 255, 216, 1) 16%, rgba(214, 255, 255, 1) 100%);
  outline: 2px cyan ridge;
}

.setting_course {
  padding: 0;
  margin: 0;
}

.btn_setting_course {
  background: transparent;
}

.content_course{
  padding: 10px;
}

.item_group_in_course{
  font-family: "Leelawadee UI", sans-serif;
  margin: 12px;
  color: grey;
  border-radius: 15px;
  background: rgb(223,226,216);
  background: linear-gradient(110deg, rgba(223,226,216,1) 0%, rgba(225,255,249,1) 100%);
}
.list_groups_in_course{
  width: 100%;
}

.card_groups{
  width: 90%;
}

.groups_tab{
  height: 50px;
  background: #c9fffb;
  color: #010101;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border-radius: 10px;
  border-bottom: 2px solid cyan;
}

</style>