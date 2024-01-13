<script setup lang="ts">
import {onBeforeUnmount, onMounted, reactive, ref} from 'vue'
import {useInfiniteScroll, useVirtualList, UseVirtualListReturn} from '@vueuse/core'
import {post} from "/src/stores/post";
import {IonPage, IonContent, IonFooter} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import CropperComponent from "@/components/parts/CropperComponent.vue";
import {solution} from "@/stores/solution";
import Solution from "@/http/modules/solution";

const readPost = ref(false)
const PostStore = post()
const SolutionStore = solution()
const attachImage = ref(false)
const pagination = {
  page: 1,
  count: 10
}

const image = ref()

const feedPosts = ref([])
let hasMore = true

async function getPostsOnFeed() {
  if (!hasMore) return
  const newPosts = await PostStore.getPosts(pagination)
  if (newPosts.length < pagination.count) {
    hasMore = false
  }
  feedPosts.value.push(...newPosts)
  pagination.page += 1
}


const el = ref<HTMLElement | null>(null)
useInfiniteScroll(el, getPostsOnFeed, {distance: 10})

let virtualList: UseVirtualListReturn<any>;
virtualList = useVirtualList(feedPosts, {itemSize: 50});


function isFutureDate(targetDate) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  return targetDateTime > currentDate;
}

const formatDate = (dateString) => {
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


</script>

<template>
  <ion-page>
    <ion-content>
      <div ref="el" class="el">
        <div v-for="(item, index) in feedPosts" :key="index" class="itemListFeed"
             @click="PostStore.sharedPostInfo = item, SolutionStore.gpId = item.sharedPostId, SolutionStore.spId = item.sharedPostId, $router.replace('/group-info-student/post')">
          <div class="title_post_div">
            {{ item.title }}
            <p class="subtitle_post">{{ formatDate(item.deadline) }}</p>
          </div>
        </div>
      </div>


    </ion-content>

  </ion-page>
</template>

<style scoped>
.itemListFeed {
  height: 50px;
  outline: 1px ridge cyan;
  border-radius: 15px;
  margin: 15px;
  display: flex;
  padding: 5px;
  color: grey;
  background: rgb(180, 252, 255);
  background: linear-gradient(96deg, rgba(180, 252, 255, 1) 55%, rgba(0, 212, 255, 1) 100%);
  align-items: center;
  display: flex;
  justify-content: space-between;
}

.el {
  border-radius: 15px;

}
.title_post_div {
  padding-left: 10px;
}
.subtitle_post {
  color: #555;
  font-size: 13px;
}

</style>

