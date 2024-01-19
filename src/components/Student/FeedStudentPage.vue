<script setup lang="ts">
import {onBeforeUnmount, onMounted, reactive, ref} from 'vue'
import {useInfiniteScroll, useVirtualList, UseVirtualListReturn} from '@vueuse/core'
import {post} from "/src/stores/post";
import {IonPage, IonContent, IonFooter} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
import CropperComponent from "@/components/parts/CropperComponent.vue";
import {solution} from "@/stores/solution";
import Solution from "@/http/modules/solution";
import {auth} from "@/stores/auth";

const readPost = ref(false)
const PostStore = post()
const SolutionStore = solution()
const attachImage = ref(false)
const pagination = {
  page: 1,
  count: 10
}

const URL_IMG = 'https://vchusia.grassbusinesslabs.tk/static/'

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


const userInitials = (item?: any) => {
  const nameParts = item.authorName.split(' ');
  const initials = nameParts.map(part => part.charAt(0)).join('').toUpperCase();

  return initials
}

let color: any
const randomColor = (authorName: any) => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

</script>

<template>
  <ion-page>
    <ion-content>
      <div ref="el" class="el">
        <v-list v-for="(item, index) in feedPosts" :key="index" class="itemListFeed"
                @click="PostStore.sharedPostInfo = item, SolutionStore.gpId = item.sharedPostId, SolutionStore.spId = item.sharedPostId, $router.replace('/group-info-student/post')">
          <div class="content_task">
            <div class="info_user">
              <v-avatar v-if='item.authorAvatar'>
                <v-img :src="URL_IMG+item.authorAvatar"></v-img>
              </v-avatar>

              <v-avatar v-if='!item.authorAvatar' :style="{ backgroundColor: randomColor(item.authorName) }">
                <span class="initials">{{ userInitials(item) }}</span>
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
            <p>{{ item.description }}</p>
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
  background: rgb(255, 251, 98);
  background: linear-gradient(96deg, rgba(255, 251, 98, 0.4206057422969187) 0%, rgba(255, 243, 186, 1) 100%);
  align-items: center;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  flex-direction: column;
}

.content_task {
  display: flex;
  width: 90%;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 0;
}

.el {
  border-radius: 15px;
}

.data_block {
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
}

.description_block {
  display: flex;
  width: 90%;
  justify-content: flex-start;
  padding-bottom: 5px;
}

.info_user {
  display: flex;
  align-items: center
}

.user {
  padding-left: 10px;
  display: flex;
  flex-direction: column;


}

.initials {
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}
</style>

