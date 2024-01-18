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
const URL_IMG = 'https://vchusia.grassbusinesslabs.tk/static/'


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



</script>

<template>
  <ion-page>
    <ion-content>
      <div ref="el">
        <v-list v-for="(item, index) in feedPosts" :key="index" class="itemListFeed" @click="PostStore.sharedPostInfo = item, SolutionStore.gpId = item.sharedPostId, SolutionStore.spId = item.sharedPostId, $router.replace('/group-info-student/post')">
          <div class="content_task">
            <div class="info_user">
              <v-avatar>
                <v-img :src="URL_IMG+item.authorAvatar"></v-img>
              </v-avatar>

              <div class="user">
                <p>{{ item.authorName }}</p>
                <p>{{ item.courseName }}</p>
              </div>
            </div>



            <div class="data_block">
              <v-card-subtitle>
                {{ formatDate(item.deadline) }}
              </v-card-subtitle>

            </div>
          </div>

          <div class="description_block">
            <p>{{item.description}}</p>
          </div>


        </v-list>

      </div>
    </ion-content>

  </ion-page>
</template>

<style scoped>
.itemListFeed {
  border-radius: 15px;
  margin: 15px;
  padding: 5px;
  color: grey;
  background: rgb(255,251,98);
  background: linear-gradient(96deg, rgba(255,251,98,0.4206057422969187) 0%, rgba(255,243,186,1) 100%);
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;
}
.content_task{
  display: flex;
  width: 90%;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 0;

}
.description_block{
  display: flex;
  width: 90%;
  justify-content: flex-start;
  padding-bottom: 5px;
}


.info_user{
  display: flex;
  align-items: center;
}
.user{
  padding-left: 10px;
  display: flex;
  flex-direction: column;
}
</style>


