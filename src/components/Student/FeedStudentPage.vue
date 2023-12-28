<script setup lang="ts">
import { ref } from 'vue'
import { useInfiniteScroll, useVirtualList } from '@vueuse/core'
import {post} from "@/stores/post";
import {IonPage, IonContent, IonFooter} from "@ionic/vue";
import {VBottomSheet} from "vuetify/labs/VBottomSheet";
const readPost = ref(false)
const PostStore = post()
const pagination = {
  page: 1,
  count: 10
}

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

getPostsOnFeed()

const el = ref<HTMLElement | null>(null)
useInfiniteScroll(el, getPostsOnFeed, { distance: 10 })

const virtualList = useVirtualList(feedPosts, { itemSize: 50 })
for (let i in virtualList){
  console.log(i)
}

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
      <div ref="el">
        <div v-for="(item, index) in feedPosts" :key="index" class="itemListFeed" @click="readPost = !readPost, PostStore.info = item">
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
          <v-card height="650" >
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
                    <v-card-subtitle class="missingDate" v-if="isFutureDate(PostStore.info.deadline) === false">Пропущено термін здачі</v-card-subtitle>
                    <v-card-subtitle>Оцінка за завдання {{ PostStore.info.points }}</v-card-subtitle>
                  </div>
                </div>

                <v-card-text class="description-post">
                  <p>{{ PostStore.info.description }}</p>
                </v-card-text>

              </div>

            </div>

            <div class="fileInputBlock">
              <v-file-input label="Прикріпіть файли до завдання" multiple variant="outlined"></v-file-input>
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

.color_post_read {
  width: 20px;
  height: 20px;
  margin: 10px 15px;
  border-radius: 50px;
}
.fileInputBlock, .acceptTaskBlock{
  width: 90%;
  margin: 20px auto 0 auto;
}
.acceptTaskBlock{
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.btnAcceptTask{
  width: 90%;
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
</style>

