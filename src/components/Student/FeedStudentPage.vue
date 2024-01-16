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
virtualList = useVirtualList(feedPosts, {itemSize: 70});


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

.el {
  border-radius: 15px;

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

