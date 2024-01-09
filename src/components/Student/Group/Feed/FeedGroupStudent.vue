<script setup lang="ts">
import {IonContent, IonPage, onIonViewWillEnter, IonFooter} from "@ionic/vue";
import {group} from "@/stores/group";
import {course} from "@/stores/course"
import {post} from "@/stores/post";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import {onMounted, reactive, ref} from "vue";
import {useInfiniteScroll, useVirtualList} from "@vueuse/core";
import CropperComponent from "@/components/parts/CropperComponent.vue";
import {solution} from "@/stores/solution";

const readPost = ref(false)
const GroupStore = group()
const CourseStore = course()
const PostStore = post()
const SolutionStore = solution()
const pagination = {
  page: 1,
  count: 5
}

const feedPosts = ref([])
let hasMore = true
PostStore.feedPosts = []

async function getPostsOnFeed() {
  if (!hasMore) return
  const newPosts = await PostStore.getPosts(pagination, GroupStore.idGroup, CourseStore.courseId)
  if (newPosts.length < pagination.count) {
    hasMore = false
  }
  feedPosts.value.push(...newPosts)
  pagination.page += 1
}

PostStore.postsInTask = feedPosts.value
const el = ref<HTMLElement | null>(null)
useInfiniteScroll(el, getPostsOnFeed, { distance: 10 })

const virtualList = useVirtualList(feedPosts, { itemSize: 50 })


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

const solutionDescription = reactive({
  description: ''
})

//Solution requests
const saveSolution = () => {
  SolutionStore.saveSolution(solutionDescription)
}
const attachImageFunc = () => {
  SolutionStore.attachImage()
}

const updateStatus = () => {
  SolutionStore.updateStatus(2)
}
const updateSolution = () => {
  const body = {
    description: "222"
  }
  SolutionStore.updateSolution(body, 2)
}
const deleteSolution = () => {
  SolutionStore.deleteSolution(2)
}
const deleteImage = () => {
  SolutionStore.deleteImage(2)
}

const findSolutionById = () => {
  SolutionStore.findSolutionById(2)
}



</script>

<template>
<ion-page>
  <ion-content>
    <div ref="el">
      <div v-for="(item, index) in feedPosts" :key="index" class="itemListFeed" @click="readPost = !readPost, PostStore.info = item, SolutionStore.gpId = item.sharedPostId">
        <div class="title_post_div">
          {{item.title}}
          <p class="subtitle_post">{{ formatDate(item.deadline) }}</p>
        </div>
      </div>
    </div>
  </ion-content>

  <ion-footer>
    <div class="text-center">
      <v-bottom-sheet v-model="readPost">
        <v-card height="750" >
          <div class="d-flex flex-column justify-center align-center mt-9">
            <div class="container">
              <div class="d-flex justify-space-between">
                <div class="pa-2">
                  <v-card-subtitle class="pa-2 d-flex flex-column justify-center align-center">{{ PostStore.info.id }}</v-card-subtitle>
                  <div :style="{backgroundColor: PostStore.info.color}" class="color_post_read"></div>
                </div>

                <div>
                  <v-card-title class="font-weight-bold">{{ PostStore.info.title }}</v-card-title>
                  <v-card-subtitle>Виконати до: {{formatDate(PostStore.info.deadline)}}</v-card-subtitle>
                  <v-card-subtitle class="missingDate" v-if="isFutureDate(PostStore.info.deadline) == false">Пропущено термін здачі</v-card-subtitle>
                  <v-card-subtitle>Оцінка за завдання {{ PostStore.info.points }}</v-card-subtitle>
                </div>
              </div>

              <v-card-text class="description-post">
                <p>{{ PostStore.info.description }}</p>
              </v-card-text>

            </div>

          </div>
          <div class="solution">
            <v-text-field variant="outlined" label="Рішення" v-model="solutionDescription.description"></v-text-field>

          </div>


          <div class="fileInputBlock">
            <CropperComponent/>
          </div>

          <div class="acceptTaskBlock">
            <v-btn class="btnAcceptTask" @click="readPost = !readPost">Здати завдання</v-btn>
          </div>

        </v-card>
      </v-bottom-sheet>
    </div>
  </ion-footer>
</ion-page>
</template>

<style scoped>

.color_post_read {
  width: 20px;
  height: 20px;
  margin: 10px 15px;
  border-radius: 50px;
}
.acceptTaskBlock{
  width: 100%;
  margin: 20px auto 0 auto;
}
.acceptTaskBlock{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnAcceptTask{
  width: 80%;
  background: #4CAF50;
  color: #fff;
}
.container{
  display: flex;
  flex-direction: column;
  align-items: self-start;
  text-align: left;
  width: 90%;
}

.description-post{
  outline: 1px solid #dbdbdb;
  width: 90%;
  border-radius: 15px;
  min-height: 20vh;
  margin: 15px auto;
}


.missingDate{
  color: red;
  font-weight: 900;
}
.itemListFeed {
  height: 50px;
  outline: 1px ridge cyan;
  border-radius: 15px;
  margin: 15px;
  display: flex;
  padding: 5px;
  color: grey;
  background: rgb(180,252,255);
  background: linear-gradient(96deg, rgba(180,252,255,1) 55%, rgba(0,212,255,1) 100%);
  align-items: center;
}
.title_post_div{
  padding-left: 10px;
}
.subtitle_post{
  color: #555;
  font-size: 13px;
}
.solution{
  width: 80%;
  margin: 0 auto;
  display: flex;
  align-items: center;
}
.solution-btn{
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.btn-send-solution{
  width: 100%;
  background: darkslategray;
  color: #fff;
}

</style>


