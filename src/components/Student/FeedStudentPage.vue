<script setup lang="ts">
import { ref } from 'vue'
import { useInfiniteScroll, useVirtualList } from '@vueuse/core'
import {post} from "@/stores/post";
import {IonPage, IonContent} from "@ionic/vue";

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

</script>

<template>
  <ion-page>
    <ion-content>
      <div ref="el">
        <div v-for="(item, index) in feedPosts" :key="index" class="itemListFeed">
          <div class="title_post_div">
            {{item.title}}
            <p class="subtitle_post">{{item.deadline}}</p>
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
  border-radius: 20px;
  margin: 15px;
  display: flex;
  padding: 5px;
  align-items: center;
}
.title_post_div{
  padding-left: 10px;
}

.subtitle_post{
  color: grey;
  font-size: 13px;
}
</style>

