<script setup lang="ts">
import {IonPage, IonHeader, IonContent,  IonList, IonItem, IonLabel, IonIcon} from "@ionic/vue";
import {group} from "@/stores/group";
import {course} from "@/stores/course";
import {onMounted} from "vue";
import router from "@/router";
import {ref} from "vue";
import {useInfiniteScroll, useVirtualList} from "@vueuse/core";

const GroupStore = group()
const CourseStore = course()
const pagination = ref({
  page: 1,
  count: CourseStore.totalCoursesInGroup
})
const coursesByGroupId = () => {
  CourseStore.courseInGroup = []
  CourseStore.coursesByGroupId(pagination, GroupStore.idGroup)
}

const redirectToCourseForGroup = (idCourse) => {
  router.replace('/group-info-student/feed-group-student')
  CourseStore.courseId = idCourse
  console.log(idCourse)
}

onMounted(() => {coursesByGroupId()})

</script>

<template>
<ion-page>
  <ion-header>
    <div class="groupActive d-flex justify-center align-center">
      <div v-for="i of GroupStore.myGroups">
        <div v-if="i.id === GroupStore.idGroup">
          <h6 class="text-center">{{i.name}}</h6>
        </div>
      </div>
    </div>
  </ion-header>


  <ion-content>

        <v-list class="list_courses">
       <p class="text-center">Мої курси</p>
        <v-list-item v-for="i of CourseStore.courseInGroup" class="item_course_group" @click="redirectToCourseForGroup(i.id)">
          <div>
            <v-list-item-title>
              {{i.name}}
            </v-list-item-title>

            <v-list-item-subtitle>
              {{i.discipline}}
            </v-list-item-subtitle>

            <v-list-item-action>
              {{i.grade}}
            </v-list-item-action>
          </div>

          <template v-slot:append>
            <v-icon>mdi-arrow-right</v-icon>
          </template>


        </v-list-item>

    </v-list>


  </ion-content>


</ion-page>
</template>

<style scoped>
.groupActive{
  outline: 1px cadetblue ridge;
  margin: 15px;
  border-radius: 15px;
  padding: 15px;
  height: 30px;
  background: rgb(223, 226, 216);
  background: linear-gradient(110deg, rgba(223, 226, 216, 1) 0%, rgba(225, 255, 249, 1) 100%);
}

.item_course_group{
  background: rgb(223, 226, 216);
  background: linear-gradient(110deg, rgba(223, 226, 216, 1) 0%, rgba(225, 255, 249, 1) 100%);
  border-radius: 15px;
  margin: 15px;
  outline: 1px solid grey;

}


.list_courses{
  outline: 1px solid #c2fff1;
  margin: 10px;
  border-radius: 15px;
}
</style>