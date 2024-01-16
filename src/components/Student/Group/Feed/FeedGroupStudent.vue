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
useInfiniteScroll(el, getPostsOnFeed, {distance: 10})

const virtualList = useVirtualList(feedPosts, {itemSize: 70})


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
<!--        <div v-for="(item, index) in feedPosts" :key="index" class="itemListFeed"-->
<!--             @click="PostStore.sharedPostInfo = item, SolutionStore.gpId = item.sharedPostId, $router.replace('/group-info-student/post')">-->
<!--          <div class="title_post_div">-->
<!--            {{ item.title }}-->
<!--            <p class="subtitle_post">{{ formatDate(item.deadline) }}</p>-->
<!--          </div>-->
<!--        </div>-->

        <v-list v-for="(item, index) in feedPosts" :key="index" class="itemListFeed" @click="PostStore.sharedPostInfo = item, SolutionStore.gpId = item.sharedPostId, SolutionStore.spId = item.sharedPostId, $router.replace('/group-info-student/post')">
          <div class="main_content_item">
            <v-list-item  class="list_item">

              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>

              <v-list-item-subtitle class="subtitle_post">
                <p class="description">{{item.description}}</p>
              </v-list-item-subtitle>

            </v-list-item>
          </div>

          <div class="description_block">
            <v-card-subtitle>
              {{ formatDate(item.deadline) }}
            </v-card-subtitle>

          </div>
        </v-list>
      </div>
    </ion-content>

  </ion-page>
</template>

<style scoped>
.itemListFeed {
    height: 70px;
    outline: 1px ridge cyan;
    border-radius: 15px;
    margin: 15px;
    padding: 5px;
    color: grey;
    background: rgb(180, 252, 255);
    background: linear-gradient(96deg, rgba(180, 252, 255, 1) 55%, rgba(0, 212, 255, 1) 100%);
    align-items: center;
    display: flex;
    justify-content: space-between;
    overflow: hidden;
  }

.title_post_div {
  padding-left: 10px;
}

.subtitle_post {
  color: #555;
  font-size: 13px;
}

.description{
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

}
.description_block{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 35%;
  height: 60px;
  padding-right: 15px;


}

.main_content_item{
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 80px;
  padding-right: 15px;
}
</style>


