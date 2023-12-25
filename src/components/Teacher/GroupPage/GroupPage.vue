<script setup lang="ts">
import {IonPage, IonContent, IonText, IonFooter, IonIcon, IonCol, IonGrid, IonRow} from "@ionic/vue";
import router from "@/router";
import {VBottomSheet} from 'vuetify/labs/VBottomSheet'
import {useToast} from 'vue-toastification';

import {group} from "@/stores/group";
import {onMounted, reactive, ref} from "vue";
import {Group, JoinGroup} from "@/models/Group";
import {add} from "ionicons/icons";
import {course} from "@/stores/course";

let sheet_change = ref(false);
let sheet_del = ref(false);
const GroupStore = group();
let groupIdentifier = "";
let groupName = "";
let groupId: any
const delCourseInGroup= ref(false)
const CourseStore = course()
const toast = useToast();
let courseSelected = reactive({id: null});
const courseAddInGroup = ref(false)
groupId = GroupStore.idGroup
const loadGroup = () => {
  groupIdentifier = "";
  groupName = "";
  for (let i of GroupStore.allGroups) {
    for (let j of i) {
      if (j.id === GroupStore.idGroup) {
        console.log(j)
        groupIdentifier = j.identifier
        groupName = j.name
      }
    }
  }

  return groupId
}
console.log(GroupStore.idGroup)

loadGroup()

let groupInfo = reactive({
  name: groupName
});

function triggerToast() {
  toast.success("Успішно скопійовано", {
    position: "top-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
  });
}

async function copyIdentifier(identifier: any) {
  try {
    await navigator.clipboard.writeText(identifier);
  } catch ($e) {
    console.log($e)
  }
}

const changeGroup = (id: any) => {
  const body: Group = {
    name: groupInfo.name
  }
  GroupStore.updateGroup(id, body)
}

const deleteGroup = (id: any) => {
  GroupStore.deleteGroup(id)
  CourseStore.coursesByGroupId(groupId)

}

const leaveGroup = (id: any) => {
  GroupStore.leaveGroup(id)
  router.replace('/main/groups')

}

const getUsersInGroup = (id: any) => {
  GroupStore.usersInGroup = []
  GroupStore.getUsersInGroup(id)
}

getUsersInGroup(GroupStore.idGroup)

async function addCourseToGroup() {
  courseAddInGroup.value = false
  await GroupStore.addCourseToGroup(groupId, courseSelected.id)
  courseSelected.id = null
  CourseStore.coursesByGroupId(groupId)
}

const copyEmail = (email: any) => {
  try {
    triggerToast()
    navigator.clipboard.writeText(email)
  } catch ($e) {
    console.log($e)
  }
}

const replaceToCourse = (info: any) => {
  console.log(info)
  router.replace('/main/courseInGroup')
  CourseStore.thisCourse = info
}

function triggerDeletedCourseFromGroup() {
  toast.error("Курс видалено з групи", {
    position: "top-right",
    timeout: 2000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.6,
    showCloseButtonOnHover: false,
    hideProgressBar: true,
    closeButton: "button",
    icon: true,
    rtl: false
  });
}
async function deleteCourseFromGroup(courseId: any) {
  await GroupStore.removeCourseFromGroup(groupId, courseId)
  triggerDeletedCourseFromGroup()
  CourseStore.coursesByGroupId(groupId)
}

// let totalCourses = CourseStore.total
// let courses: any[]
// const loadCourses = () => {
//   courses = []
//   CourseStore.getAllCourse({page: 1, count: totalCourses})
//   for(let i of CourseStore.items){
//     courses.push({id: i.id, name: i.name})
//   }
//   console.log(courses)
// }
// loadCourses();
onMounted(() => {
  GroupStore.getCreatedGroupsList()
})
onMounted(() => {
  CourseStore.coursesByGroupId(groupId)
})

</script>

<template>
  <ion-page>
    <ion-content>
      <div v-for="i of GroupStore.allGroups">

        <div v-for="f of i">
          <div v-if="f.id === GroupStore.idGroup" class="group">
            <span>{{ f.name }}</span>
          </div>
        </div>

        <div class="set_group">
          <v-btn icon="mdi-plus" size="large" @click="copyIdentifier(groupIdentifier), triggerToast()"
                 color="teal-accent-2"></v-btn>
          <v-btn icon="mdi-pencil-outline" size="large" @click="sheet_change = !sheet_change"
                 color="purple-lighten-2"></v-btn>
          <v-btn icon="mdi-delete-outline" size="large" @click="sheet_del = !sheet_del" color="red-accent-2"></v-btn>
        </div>
      </div>

      <v-layout class="mt-4" v-show="CourseStore.courseInGroup.length > 0">
        <v-card class="content_courses" elevation="4">
          <p class="title_courses_list">Список курсів</p>
          <v-list class="list_courses">
            <div v-for="i of CourseStore.courseInGroup">
              <v-list-item class="course_item">
                <div @click="replaceToCourse(i)">
                  <v-list-item-title>
                    {{ i.name }}
                  </v-list-item-title>

                  <v-list-item-subtitle>
                    {{ i.discipline }}
                  </v-list-item-subtitle>
                  <v-list-item-action>
                    <pre class="role_users">Клас: {{ i.grade }}</pre>
                  </v-list-item-action>
                </div>
                <template v-slot:append>

                  <v-btn
                      color="grey-lighten-1"
                      icon="mdi-trash-can-outline"
                      variant="text"
                      @click="deleteCourseFromGroup(i.id)"
                  ></v-btn>
                </template>
              </v-list-item>

            </div>
          </v-list>
        </v-card>
      </v-layout>

      <v-layout class="mt-4">
        <v-card class="content_people" elevation="4">
          <p class="title_user_list">Учасники групи</p>
          <v-list class="list_users">
            <div v-for="i of GroupStore.usersInGroup">
              <v-list-item v-for="j of i" :title="j.name" :subtitle="j.email" class="user_item"
                           @click="copyEmail(j.email)">
                <pre class="role_users">{{ j.role }}</pre>
              </v-list-item>
            </div>
          </v-list>
        </v-card>
      </v-layout>


    </ion-content>

    <ion-footer>


      <div class="text-center">
        <v-bottom-sheet v-model="sheet_change">
          <v-card class="text-center" height="300">

            <br>
            <br>
            <div class="sheet_change">

              <v-text-field
                  color="primary"
                  label="Назва групи"
                  variant="outlined"
                  v-model="groupInfo.name"
              >

              </v-text-field>

              <v-btn prepend-icon="mdi-pencil-outline" @click="sheet_change = !sheet_change, changeGroup(groupId)"
                     color="indigo">
                Змінити
              </v-btn>

            </div>

          </v-card>
        </v-bottom-sheet>
      </div>

      <div class="text-center">
        <v-btn class="btn-add-course mb-1" size="large">
          <ion-icon :icon="add" color="danger" id="open-modal" @click="courseAddInGroup = !courseAddInGroup"></ion-icon>
        </v-btn>

        <v-bottom-sheet v-model="courseAddInGroup">
          <v-card height="300">
            <v-card-text>
              <v-select
                  :items="GroupStore.allCourses"
                  prepend-icon="mdi-book-outline"
                  label="Вибрати курс"
                  item-title="id"
                  v-model="courseSelected.id"
                  variant="outlined"
              >
                <template v-slot:item="{ props, item }">
                  <v-list-item v-bind="props" :subtitle="item.raw.name"></v-list-item>
                </template>
              </v-select>

              <div class="btnAddCourse">
                <v-btn @click="addCourseToGroup()" class="btn_add_course">
                  Додати
                </v-btn>
              </div>

            </v-card-text>

          </v-card>
        </v-bottom-sheet>
      </div>


      <div class="text-center">
        <v-bottom-sheet v-model="sheet_del">
          <v-card class="text-center" height="200">

            <br>
            <br>
            <div class="sheet_del">

              <v-btn prepend-icon="mdi-delete-outline" color="red" @click="sheet_del = !sheet_del, deleteGroup(groupId)"
                     class="btn_del">
                Видалити групу
              </v-btn>

            </div>

          </v-card>
        </v-bottom-sheet>
      </div>

      <div>
        <v-bottom-sheet>
          <v-card>


          </v-card>
        </v-bottom-sheet>
      </div>


    </ion-footer>
  </ion-page>
</template>

<style scoped>
.group {
  width: 85%;
  margin: 15px auto;
  border-radius: 12px;
  padding: 10px;
  background: rgb(223, 226, 216);
  background: linear-gradient(110deg, rgba(223, 226, 216, 1) 0%, rgba(225, 255, 249, 1) 100%);
  display: flex;
  color: grey;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.set_group {
  width: 85%;
  display: flex;
  justify-content: space-between;
  margin: 15px auto;
}

.sheet_add {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.btn_join, .btn_leave, .btn_share_code, .btn_del {
  margin: 10px;
  width: 90%;
}

.sheet_change {
  width: 85%;
  margin: 0 auto;
}

.sheet_del {
  width: 85%;
  margin: 0 auto;
}


.user_item {
  border-radius: 10px;
  margin: 12px;
  background: rgb(223, 226, 216);
  background: linear-gradient(110deg, rgba(223, 226, 216, 1) 0%, rgba(225, 255, 249, 1) 100%);
  color: grey;
}

.title_user_list {
  color: grey;
  text-align: center;
  font-family: "Fira Code Medium", monospace;
}

.content_people {
  background: rgb(215, 255, 202);
  background: linear-gradient(183deg, rgba(215, 255, 202, 1) 0%, rgba(159, 219, 250, 1) 100%);
  width: 95%;
  margin: 15px auto;
}

.list_users {
  background: rgb(239, 241, 233);
  background: linear-gradient(183deg, rgba(239, 241, 233, 0.8519782913165266) 0%, rgba(226, 255, 246, 0.7819502801120448) 100%);
}

.content_courses {
  background: rgb(0, 160, 215);
  background: linear-gradient(183deg, rgba(0, 160, 215, 1) 16%, rgba(100, 246, 255, 1) 100%);
  width: 95%;
  margin: 15px auto;
}

.list_courses {
  background: rgb(0, 215, 202);
  background: linear-gradient(183deg, rgba(0, 215, 202, 1) 16%, rgba(100, 246, 255, 1) 100%);
}

.title_courses_list {
  color: #fff;
  text-align: center;
  font-family: "Fira Code Medium", monospace;
}

.course_item {
  border-radius: 10px;
  margin: 12px;
  background: rgb(85, 255, 216);
  background: linear-gradient(207deg, rgba(85, 255, 216, 1) 16%, rgba(214, 255, 255, 1) 100%);
  color: grey;
}

.role_users {
  color: #4c148e;
}

.btn-add-course {
  min-width: 30px;
  border-radius: 50px;
  margin-top: 10px;
}

.btnAddCourse {
  display: flex;
  justify-content: center;

}

.btn_add_course {
  width: 80%;
  background: rgb(85, 255, 216);
  background: linear-gradient(207deg, rgba(85, 255, 216, 1) 16%, rgba(214, 255, 255, 1) 100%);
}
</style>