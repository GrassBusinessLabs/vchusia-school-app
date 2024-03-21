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
import {message} from "@/stores/message";
import router from "@/router";
import {computed} from "vue";
import {comment} from "@/stores/comment";
import AvatarDev from "@/components/icons/avatar-dev.vue";

const readPost = ref(false)
const PostStore = post()
const SolutionStore = solution()
const MessagesStore = message()
const attachImage = ref(false)
const CommentStore = comment()
const pagination = {
  page: 1,
  count: 10
}

const URL_IMG = 'https://vchusia.grassbusinesslabs.tk/static/'

const image = ref()

const feedPosts = ref([])
let hasMore = true

// async function getPostsOnFeed() {
//   if (!hasMore) return
//   const newPosts = await PostStore.getPosts(pagination)
//   if (newPosts.length < pagination.count) {
//     hasMore = false
//   }
//   feedPosts.value.push(...newPosts)
//   pagination.page += 1
// }
// async function userMessages() {
//   if (!hasMore) return
//   const newPosts = await MessagesStore.userMessages()
  // if (newPosts != undefined){
  //   if (newPosts.length < pagination.count) {
  //     hasMore = false
  //   }
  // }
  //
  // feedPosts.value.push(...newPosts)
  // pagination.page += 1
// }
//
// userMessages()
// const el = ref<HTMLElement | null>(null)
// useInfiniteScroll(el, userMessages, {distance: 10})

const userMessages = async () => {
  await MessagesStore.userMessages()
}
userMessages()

let virtualList: UseVirtualListReturn<any>;
virtualList = useVirtualList(feedPosts, {itemSize: 70});


const selectMessage = (message: any) => {
  MessagesStore.thisMessage = message;
  MessagesStore.msgId = message.id;
  router.replace('/group-info-student/post');
}

const groupedMessages = computed(() => {
  const grouped = {};
  MessagesStore.allMessages.forEach(message => {
    const date = new Date(message.updatedDate).toLocaleDateString();
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(message);
  });

  const sortedGrouped = Object.keys(grouped).sort((a, b) => new Date(b) - new Date(a));

  return sortedGrouped.reduce((acc, date) => {
    acc[date] = grouped[date];
    return acc;
  }, {});

})


function isFutureDate(targetDate) {
  const currentDate = new Date();
  const targetDateTime = new Date(targetDate);

  return targetDateTime > currentDate;
}

const formatDate = (dateString) => {
  const targetDate = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (isFutureDate(dateString)) {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return targetDate.toLocaleString('ua-UA', options);
  } else if (targetDate.toDateString() === today.toDateString()) {
    return 'Сьогодні';
  } else if (targetDate.toDateString() === yesterday.toDateString()) {
    return 'Вчора';
  } else {
    const options = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return targetDate.toLocaleString('ua-UA', options);
  }
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
<!--      <div ref="el" class="el">-->
<!--        <v-list v-for="(item, index) in feedPosts" :key="index" class="itemListFeed"-->
<!--                @click="PostStore.sharedPostInfo = item, SolutionStore.gpId = item.sharedPostId, SolutionStore.spId = item.sharedPostId, $router.replace('/group-info-student/post')">-->
<!--          <div class="content_task">-->
<!--            <div class="info_user">-->
<!--              <v-avatar v-if='item.authorAvatar'>-->
<!--                <v-img :src="URL_IMG+item.authorAvatar"></v-img>-->
<!--              </v-avatar>-->

<!--              <v-avatar v-if='!item.authorAvatar' :style="{ backgroundColor: randomColor(item.authorName) }">-->
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
<!--            <p>{{ item.description }}</p>-->
<!--          </div>-->


<!--        </v-list>-->

<!--      </div>-->

<!--      <v-card v-if="MessagesStore.allMessages.length > 0">-->
<!--        <v-card-text>-->
<!--          <div>-->
<!--            <v-list>-->
<!--              <template v-for="(messages, date) in groupedMessages" :key="date">-->
<!--                <p>{{ date }}</p>-->

<!--                <v-list-item-->
<!--                    v-for="message in messages"-->
<!--                    :key="message.id"-->
<!--                    class="item-feed"-->
<!--                    @click="selectMessage(message)"-->
<!--                >-->
<!--                  <v-list-item-title>{{ message.text }}</v-list-item-title>-->
<!--                </v-list-item>-->
<!--              </template>-->
<!--            </v-list>-->
<!--          </div>-->
<!--        </v-card-text>-->
<!--      </v-card>-->

      <div class="feed-card" v-for="i of MessagesStore.allMessages" @click="selectMessage(i)">
        <div class="user-info">
          <div class="avatar-card">
<!--            <v-avatar  class="user-avatar" v-if="i.userAvatar !== ''">-->
<!--              <v-img :src="imgURL+i.userAvatar"></v-img>-->
<!--            </v-avatar>-->
            <v-avatar class="user-avatar"><span class="initials">YU</span></v-avatar>

            <div class="comment-info">
              <p class="name-user-comment">Username</p>
              <div class="d-flex">
                <p class="data-send-comment">21.05.2024</p>
              </div>
            </div>

          </div>

        </div>

        <div class="comment-text-card">
          <p>{{i.text}}</p>
        </div>

        <div class="comment-text-card">
          <div class="users-solution-card">
            <div class="deadline">
              <span class="deadline-title">Термін здачі завдання</span>
              <span class="deadline-date">{{ formatDate(i.createdDate) }}</span>
            </div>

            <div class="users">
              <div class="avatars">
                <avatar-dev class="avatar" v-for="i in 7"/>
              </div>

              <div class="counter">
                <span>7/18</span>
              </div>
            </div>
          </div>
        </div>
      </div>



<!--      <p v-else class="mt-4 text-center">Завдань немає</p>-->



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


ion-content::part(background) {
  background: rgb(243, 233, 224);
}

.feed-card{
  margin: 16px;
  border-radius: 16px;
  box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5), inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25), 0px 4px 8px 0px rgba(169, 163, 157, 0.25), 0px -2px 8px 0px rgba(0, 0, 0, 0.04);
  background: rgb(255, 248, 237);

  .user-info {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-start;

    .avatar-card {
      padding: 16px;
      display: flex;
      align-items: center;

      .comment-info {
        display: flex;
        margin-left: 8px;
        flex-direction: column;
      }
    }
  }
}

.name-user-comment {
  color: rgb(66, 126, 154);
  font-size: 16px;
  font-weight: 400;
  line-height: 125%;
  text-align: left;
}

.data-send-comment {
  font-size: 12px;
  font-weight: 400;
  line-height: 125%;
  text-align: left;
  color: rgb(58, 77, 83);
  margin-top: 4px;

}


.user-info:after {
  content: '';
  width: 100%;
  display: block;
  height: 2px;
  box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.15);
  background: rgb(255, 248, 237);
}
.comment-text-card:after {
  content: '';
  width: 100%;
  display: block;
  height: 2px;
  box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.15);
  background: rgb(255, 248, 237);
}
.comment-text-card {
  & p{
    padding: 8px 16px;
  }
  & .users-solution-card{
    padding: 8px 16px;
  }
}
.users-solution-card {
  display: flex;
  flex-direction: column;

  border-radius: 16px;


  .deadline {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .deadline-title {
      color: rgb(66, 126, 154);
      font-size: 12px;
      font-weight: 400;
      line-height: 125%;
      text-align: left;
    }

    .deadline-date {
      color: rgb(58, 77, 83);
      font-size: 12px;
      font-weight: 400;
      line-height: 125%;
      text-align: left;
    }
  }

  .users {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .avatars {
      margin-left: 8px;

      .avatar {
        margin: 0px -8px;
      }
    }
  }
}

.user-avatar{
  border-radius: 34px;
  width: 48px;
  height: 48px;
  background: url(),rgb(182, 118, 118);
  .initials{
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
}


</style>

