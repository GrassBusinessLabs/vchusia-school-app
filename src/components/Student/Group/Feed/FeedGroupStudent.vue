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
import Course from "@/http/modules/course";
import {message} from "@/stores/message";
import {computed} from "vue";
import router from "@/router";

const readPost = ref(false)
const GroupStore = group()
const CourseStore = course()
const PostStore = post()
const SolutionStore = solution()
const MessageStore = message()
const pagination = {
  page: 1,
  count: 5
}

const feedPosts = ref([])
let hasMore = true
PostStore.feedPosts = []

const userMessages = async () => {
  await MessageStore.userMessages()
}

userMessages()
// async function getPostsOnFeed() {
//   if (!hasMore) return
//   const newPosts = await MessageStore.userMessages()
//   if (newPosts.length < pagination.count) {
//     hasMore = false
//   }
//   for (let i of newPosts){
//     if(i.courseId === CourseStore.courseId){
//       feedPosts.value.push(i)
//     }
//   }
//   pagination.page += 1
//
//  }
//
// console.log(feedPosts.value)
// PostStore.postsInTask = feedPosts.value
// const el = ref<HTMLElement | null>(null)
// useInfiniteScroll(el, getPostsOnFeed, {distance: 10})
//
// const virtualList = useVirtualList(feedPosts, {itemSize: 70})
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

const groupedMessages = computed(() => {
  const grouped = {};
  MessageStore.allMessages.forEach(message => {
    if (message.groupId === GroupStore.groupId) {
      console.log(message.groupId);
      const date = new Date(message.updatedDate).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(message);
    }
  });

  const sortedGrouped = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return sortedGrouped.reduce((acc, date) => {
    acc[date] = grouped[date];
    return acc;
  }, {});
});


const selectMessage = (message: any) => {
  MessageStore.thisMessage = message;
  MessageStore.msgId = message.id;
  router.replace('/group-info-student/post');
}



function isFutureDate(targetDate: any) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  return targetDateTime > currentDate;
}

const solutionDescription = reactive({
  description: ''
})

const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16)
}

const userInitials = (item?: any) => {
  const nameParts = item.authorName.split(' ');
  const initials = nameParts.map(part => part.charAt(0)).join('').toUpperCase();
  return initials
}
</script>

<template>
  <ion-page>
    <ion-content>
<!--      <div ref="el">-->
<!--        <v-list v-for="(item, index) in feedPosts" :key="index" class="itemListFeed" @click="PostStore.sharedPostInfo = item, SolutionStore.gpId = item.sharedPostId, SolutionStore.spId = item.sharedPostId, $router.replace('/group-info-student/post')">-->
<!--          <div class="content_task">-->
<!--            <div class="info_user">-->
<!--              <v-avatar v-if='item.authorAvatar'>-->
<!--                <v-img :src="URL_IMG+item.authorAvatar"></v-img>-->
<!--              </v-avatar>-->

<!--              <v-avatar v-if='!item.authorAvatar' :style="{ backgroundColor: randomColor() }">-->
<!--                <span class="initials">{{ userInitials(item) }}</span>-->
<!--              </v-avatar>-->

<!--              <div class="user">-->
<!--                <p>{{ item.authorName }}</p>-->
<!--                <p>{{ item.courseName }}</p>-->
<!--              </div>-->
<!--            </div>-->



<!--            <div class="data_block">-->
<!--              <v-card-subtitle>-->
<!--                {{ formatDate(item.deadline) }}-->
<!--              </v-card-subtitle>-->

<!--            </div>-->
<!--          </div>-->

<!--          <div class="description_block">-->
<!--            <p>{{item.description}}</p>-->
<!--          </div>-->


<!--        </v-list>-->

<!--      </div>-->
      <v-card>
        <v-card-text>
          <div>
            <v-list>
              <template v-for="(messages, date) in groupedMessages" :key="date">
                <p>{{ date }}</p>

                <v-list-item
                    v-for="message in messages"
                    :key="message.id"
                    class="item-feed"
                    @click="selectMessage(message)"
                >
                  <v-list-item-title>{{ message.text }}</v-list-item-title>
                </v-list-item>
              </template>
            </v-list>
          </div>
        </v-card-text>
      </v-card>
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

.initials {
  font-weight: bold;
  font-size: 20px;
  color: #fff;
}

.item-feed{
  border-radius: 15px;
  margin: 15px;
  padding: 5px;
  color: grey;
  background: rgb(255, 251, 98);
  background: linear-gradient(96deg, rgba(255, 251, 98, 0.4206057422969187) 0%, rgba(255, 243, 186, 1) 100%);
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

</style>


