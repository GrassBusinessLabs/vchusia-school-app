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
            <v-avatar class="user-avatar"><span class="initials">YI</span></v-avatar>

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
                <v-avatar class="avatar" v-for="(i, index) in 7" :key="index" :style="{ zIndex: 7 - index }">

                  <img  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUWFRgVFRIYGBgZGBoYGRgYGBgaGBgYGBgZGRgYGBgcIS4lHB4rHxgcJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISGjQhISE0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NDQ0MTQ0NDQ0NDQ0NDQ0NDE0NP/AABEIARMAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAQIDBAUGB//EADsQAAEDAgMFBgUBCAIDAQAAAAEAAhEDIQQSMQVBUWFxBiKBkbHBEzKh0fBSBxRCYoKS4fEjchYzohX/xAAYAQADAQEAAAAAAAAAAAAAAAAAAQIDBP/EAB8RAQEBAQADAAMBAQAAAAAAAAABAhESITEDQVEiE//aAAwDAQACEQMRAD8AvgJwCUBOAXE7TQE4BKAlhAJCWEQlCASEQnIQCAJYQ4gCSYHErMxnaLDU7OrtJ4M75/8AlPheo1ISgLjMX2+ptMU6Tnc3ENHlcqGl2+mzsOB0f9wn4aLyjuoRC4yv26DYLaJcNSZiOSv7G7Y4escrz8Nx0DvlPRyPCjyjpYRCZSrMeJY5rhxaQR9FKpMyEQnQiEEZCIT4SQgGQkIUkJpCAjhCdCEBGAlASgIQoJQhCAEqFXxuLbTYXv0HmTwCAkr12saXvcGtGpJsuN2z22gluHbP87hb+lv3WFt/bNSu7vGGD5WDQczz6rEeR+fda5z/AFnrSzjtpVapmpVc7kScv9osqJH5dI556eqGtnjPMgBayIApn8gepVilgnm8EeH2VrZuEMzBJ4GGjrJv5QrtfEOaMogHlDjPAl1h6oJWp0A0d6o0cnG/mCQFW+E15I0JgWIM9IMcFXrucSZJ8SZ8QFCwwdT4J8Lq3QxdbDv/AOOo5h5Gx6tNj4rtdg9u8xazEsAm3xG2HLM3d1C51lIVacxL2aiLvb0WRi8NkMi3Ag2+6mya+q7Z8e5B4IkGQbiN88EoXmPZjtcaAbSrEupi2a5cydwG9q9IwmLZVaH03BzTo5pEf75LDWLlpNSp0QkEpwUmSEhCVCAYQhOKEBAEqRKkoJUiEwCeK4LtPtE1HkT3G2A9+pXW7bxOSmf5rf49l5rtLEyYGu/gFWYWmfVfPRRO5f5UoZNzYcd5UdRw0Gn5qtoyqP8APzipaboiNdJEzPXj0UJKfT9bW1PIKibmy2EnLN7k8uvRS4kXysaXv0MEhoPAv5cBCzcPiCBkBsT3oPDdO/04LXa+WBstAizRw5neeQQHO4ijHzGelm+B3qsOQst3E0GjTvHWSfQLLrUDqd/DRPpcaOw8UQ8CT0mbaERHurW2sJke5okNIzN4GbxBBWZgKbgczQbfmq6cUzWYJaQ9o7s8uRUWrmbY4h4jWDxGhC0dg7bqYZ+ZhlpIzMJ7rh7Hml2lgCCSZB4lZj2GbiOkkK/ViLLmvcdmbQZXY2ow2cNDqDvBVxeV9htsupVRSce486fpdG7qvVGOlc28+Na5vYWEEIlBUmaUJSkQECEISUEhKFR2vjPh03O3nut5uNgmHM9rNpkuLGHQROuXmOZXKtoADM6w4b/9rRxrg3M9xuTPU8fsufxOJLjrA3ALbM76iNXn0/EYibCwChAQ1qWVpJxn3ppCe0ee7om69PdP5fn+kBLQ7tyY+quMxIBEtk8Cfq4+yrYXDPe8NY0uO4e5XXbL7PsZ8zc9Q7v4Gzx4n85iNakaZxdfGZhmVHicsA2sBrzJF1qUOzz36j7cyuu2fsjQuueGgb9luUsKGj5R4LK6tbz8ec/XG0ezLWgSAfC6uUNk5OYj5dy6RzAq76ai2tJI5baWymvBERaP8HkuD2xso0yREei9Zq0Vg7b2eHsNu8AY+yrOrEb/ABzUeX0XlrgeBBHIgyIPBe07HxQfTY4GQWgjxErx7F08ji0iL/gXpXY2rmw7L6S0+BC137nXLmcvHToKAUFYtCFCChBIEiEJKCwO0FcAS75W8f1HQeU/VbrzZee9qsb8R7qbXdxlnuvd51a0bzqrxO0reRzOOxTqryZJHoFXAAsLnj7BS1ngDK0Q3fxJ3Cd6jDoExc2HLifb/S6Ixoe7dw1PEpAUxqkYP9/ZBHAK/gcGXmOO/gPcx6pMDgS+57rR9fy67vszstrQHlok3k7huHK3qs9643xjv1JsfZIpMENu7iLudu5wPyV0eAwWQTq46k7pukwrc7s+4WbyHHqVpAWWFvXTPSbDtAVxwB1VSmpgFUqKjexQVWKw8XULzZKqilUCzsXTtotOqFUr6JK6807WYKHZwNfVdD+z6rOHcP0v/wA/dR9psPmpu4i48FD+zqpaq3gQfMQtO9y5dTmneIlIzRCgFQhCCV0FCElKW1a2RhcJmIEc15jtKpfLoAbgagn+Gd7jqSu77UVXBrWM+Z5gcrXJ6BcU/DUyC57wAwxlHzPO8+J381rj1Cs78YLyXO/ICR5k26K7UpNDc2hce625OWbnpCpz5/nmtpesbOEA/wAn7LS2TgHVXgAW9BxKpYeiXuAC7/YmzxTYCRzPHko3ri/x58qZTwTM7KIu3V/MASZ8IH9a6Rl4YP4vm5N/LLC2ZJe95P8AKOV5PoFq0xUdPw4E2LjcgcgPyywvt159RtfGYwAFwHUx6po2zRBgvHWbeazWbBBu6oXE3JKKnZNjhma6DxTmYnWq6GljqboLajD4q2Ko4heeYzsziWmWVARykHyTMJhcQw3LjaTmmZtpzuVfIjyv8ejOcoqhWVs3FPIGadADbfdaLiosaRDUCp1hAUuNxTWNLidFxe1e1jzLabPP3RnNpa3I0dpNDmuB3gj6LF/Z8IqVhyb7rJftLFPMwY4hpjyXTdiKBAe8tguifMj2V2eMY615V1zdE5I1KswEIQgKyJSISNyO1qwdjqTHGG5o5Xa5cztxwNQljIbJgHeRvhdxtjZ/fZXEDKZdabAET5FcfiME6rXaIj4jyGt4DWDHKSY0ga79s2fU3vyftlUsK55nU73bmzp4q1idjnIC3yXZVOzZYzI3XfzKhw+CeGZXC7JHgdPzkp861/5SRzfZ/BHOC4abiu1rmGeB9Fn7NotDtNFcxroY48Gn0lTq9qvx55BsrCn4YI1dL/P5fZNrbY+BZ9NwjgJB6FbOAZDWjgAPIABS1sK18tIsplaXN56cbW7aVCSKdPTq4jdeLBQ/+XYouLdHty9y2Y5mkyBliANZOrhzjpm9nGMJyjKCIdYXB3FJ/wDiQScubNE2EkA/LmIls8itpc/pzam+/VXBdoq5y/EbBcAQHty5hGrXtt9F0OGrZwDEciqe1C+qwMNNjQIgaxGhHA2Wjs3C5KcOOYjeBH+1Oud9Ncd8f9T2sYemCRZPxTgySdyjpVIuqm16maDNjYqO9X4sjHVmvu8w3cN55gKiNpYOkbNY52/vNMHziU/aWyHPbJzOkmW2DMt4Gsk6G44rO2dslrKjGve4hhEuqEQ1rD3WU7mW+Wp8dczvpz7tnvi2e0dF/dAibDQjzBWr2dEsLuN/U+643tBs9j8STRytbG4anfMLtOzlAsotBMkk38Y9ktyT1Clt+xrhKkCFmAhIUICuhIlSNHXjLdc5sWRjCHt/9bSWnnnObzDm/wBq6N7fVPp02gzF/qjv056sq+HtztLrNdN/ArLxlZmerTbB7stI3wJP0U9cGwt3SdDI1iykfRY4ghgD8pl2+CNFErps77c5gKfeKk2hTkEcbeZA90+i2HBTY9ndHX3C0qM/eLuEdpKvsYOizsCdJWm1Q1qwyEOpt3tTGK2WGLq4zqqKTf0hDwpQAo8QQN6LTkVHdFDi6QLLblKXAlPcwlhBFkopQw7w4evVMrYUHgmYNpDnDn6q3U0uE7eJmesPEYUNJdAlauyxFNg5SqGL1haeDEMb0HojvWX5MyX0tShNlKhmVCRCAroSJUgad3VPBTSNOqcgIXuyNALrZiZi9xoeX5wU+Gc97XloAIbN5BI0EBIXKpsvHA4sMJ+ZjgAl4zrSb1Mlo4FwAJ4A+d0zHN08PWF0LGSxvKW+RP2WJtFvePT0gqteoMXtJhnQYWjQcs0NINvzcrtKyh0dXm6qxnsqlOVYTiKSVn4t3fg2kWWiAosTSa8Q4Tw4joUCX2zxXYw954nhInyV1mMYWEe8KjX2HQIcfhtki5i56rDr7NrwA05WCwN5jxVQ7W7h8pqOgyIvwmbKevYaKnsvDCk2ASSbkkzJU2LqWU0SsnFx4rSw/wAoHIeixxLnHgPdbVLQdFTH8mu1KhNTkMwhCEBXRKaEqAUpUgSSgGYmoGtk7hdcZ2d2nn2ix14zZW9LytftbjclAgGC63hvXI9i3j96YDrmEeaeJ3uhq8ky9lpug1GfpdmHRw+4WLjh3iOR91b2ni/h15PyuEHoquKImfyEtLx6pzIMOG+PrCtNYqeGNo4T9CrrHKGyxTNkr6wGpgJlIhFZgdYhMKrdsUnSGvBjgUO2ozcZUGK2cw3yNnoFQGz2A6RxhVJGmc5rTqbUEEBuvFU621JGUKtidnsGjiehcoauDZlFybC0mOmt0+L8Ynw+1GzBKu4g9wuWVsrDNa4vygbhYK5i6mYhg3m/ulc+3Pq8MwjO7PEj6kBaVPQdFWY2AAOPurLdEOenoSIQCoSIQECVNlCAckhCjxFUMYXFLV5DzO1wvbfE5n5RoPvdZXYuf32gImX+x+yTblXM8k8fUytP9muFz41rtzGud7D1W+J44Rq909G7SMzOtuWNSxUdx+m48OS3tpGXlY+Jwc6LHvtvM+kuHqQTfXQ+SvMesFmZg13/AEt91Yo4r83JK632PVhY1HFK9SxIKAtAKGrhGu5Hknh6na5EV1j1tnvGjhHMfYqq/AHV755AQuieVmY8p9o8rWTVeG20AU2BpH53anQcAo6FLO4k6D6laBsE6w1faNo7qmZv/NyYB3R0Thqkk9CAhACEIQFeUSmyllALKyu0eIysharSuQ7U4qXRwulzupFZ9S1yeNfMru/2W4DJTqYhwjO4Mbzay7j5mPBcZsvZj8TVbSYNT3nbmNm7j+XXrdOkykxlKmIYwBo9yeZW29cnEYz5a6K7pcla1N1upGLB1KuMwYjMBz9JWNUpFpXXMpy1ZjsKDLY009I+k+KcRfjBFQhWKeMIRisIWlUnNIVcT2xv4baII1urzMc3iuKrSNLKLDV3l7W5jBcB5lPxHm7iptFvFZmIxRecrBPE7h1U4wrP0BStaBYAAckvRXVMoUg0AfXid5TnmycmVNEkFOngllI5DdUBKiU2UqAVCRCAqyhNBSygCq6Gk8lwuLw9TEV/h0xLnGJ3NG9zuAXa4mg9/cYJJ14AcTyVzZ+y2YZmVt3uu951cfYcks3l6uz/ADIi2NsqnhaeRl3m7373H2A3BXMtkjW3lTtapt61znkQNantCHNTkGs0CoqkB9xZ3+j9cqKb0mNd3c36b+H5fwTTxFi8KCsPE4QgrpS6VUrsBVSpscpiqJhU9nUz8Zg/mH0XSYqiIWEysynUD32aDrwmyufGeo6lEplOoHCWmQd4TlBFlNd7j1SpD7oBTqhm9JKUIB6JTZQgHyhNlCApypadNzrNbJ/NTuCfg8KXm1gNTuH+VpCGDK23PeeqLRnPWFjdl1yCW4gMPBgcB/dMlc/Ux2NwrpqTUp8Tcf3ag9V2zgh9FrgWuaCDYg3BRL+mtyh2PtGniGZmG4+Zp+Zp4EK9ELh9pbNqYKp+8Yeck95vAfpdxb6LrNlbUZiGB7NRZ7N7TwPsUaz+4edf1ac1NhTxKYWqVdRgpz4LSDvBB8RCaglBIMNUljb3Aynq2x9Er3qtTOUvH82Yf1C/1CifUVQqZjallzeIGYwRYrVxTi4wFRFK/irjOq2zcQ+g/wCGXHI75CdAf0rpWYv9Q8ljYvBB7S3fqDwI0RsTH5gab7PZY8xxRZ1PHQNrNO9K524KkWpWscNCpsPxXUoVNuIcNRKnp12u0PgkVlTShJKJQRZQkQqJrPIa3I0QBu9zzVZxSPfKjLlnXRmchxKVj1GHILUzqw9oc0giQRBB3grg8fhqmArCrSux246Eb2O9iuyDnBQ4pgewseyWnVVKmp9lbUZWYHsNjZzd7HbwVoiCvNqtCrgqnxGd6mTB4EfpdwPArr8BtNtRgew2Pm0/pPNFzz3BPbWexRuCh/eZv4I+LxSHKrVW98/9fcqo5y0HwXjoqGIZldyTh0wUtSqYp69Vt0WAiFTxNDKjpePVNrll7UwZzCrTs9u79Q4LV+GnFicpXKDZ2MD2B3mN4O8LUaJXN0/+PEZR8tS/9Q1XU4ZunROlEFRqqPZwWrVpKq6moUjw2J/hdr6q3Kza9PeFZw1bML6jVDLWeLMoTZQqSsMKeAkY1PIWbrMhOlNlKU0nAqenCqZlKx6cTUlfBseC1zQQRBB0K4bF0H7PxAIBdQfu1tvH/YajiF3jHqptrANr0nU3a6tP6XDQq5U3qtAIDmnM1wBaRoQUrSuc7L49zC7C1dQTknc4TmZ7jxXRGZ4/m9K54qa6ZPeb0d7J1a6cWG5OtvAfkqN4Un0yk8tVio4OCiAsmyg+ow1MqBSlRvCcTXN7cJaGvGrHA/ddXszEB7GvBs4SsLatDMx44hRdjMYcrqZ/hMjof8q/sR8rsjcKs9imY+ya8qKuKdVqpsOV88bFaDwqGJYiFr3F6UKGi6WgpU2LVASQp8lkxzVm6eoHNSFSuUDymXSOS03KPMlYUBdYU9QsKlhVEuM7Z7NLXNxLLEEZiNxHyv8AzktXYmPFem14s4d144O+x1HVa+Kote1zHCQ4EEciuBw73YHElr5LHWJ4sJ7r+o+6uXsL47t7bKs4KcvkWuDcc+ChKlaOEhTimFANKa5PKaUBSrhc5s13wcUWkw109L3C6XEBct2npiGvFiDlPRVn+M9f13VGopcy5jsxjM1FoJkt7p420W8yoo1OU5U7lVxDbKwHSoqwRDvxWwhsRwKFFRdDiEJsa68KCqlQpbxXqKvUQhAqIJ7UIQSzT0VhCEAxcn28pj4LXR3g8id8HchCrP0Va7I1C7DNzGYloncAdFp1NUiE9fRDXKNCFCiOUZQhUFesuV7T/K3qfRCFWPrPXxR7O1CKwAMA6jiu5ahCf5Pqc/FugiqhCzi6zz8/mhCE2Vf/2Q==">
                </v-avatar>
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




.comment-text-card {
  & p{
    padding: 8px 16px;
  }
  & .users-solution-card{
    padding: 8px 16px;
  }
}
.comment-text-card:before{
  content: '';
  width: 100%;
  display: block;
  height: 2px;
  box-shadow: inset 0px 1px 1px 0px rgba(0, 0, 0, 0.15);
  background: rgb(255, 248, 237);
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
      display: flex;
      position: relative;
      padding: 10px;

      .avatar {
        position: relative;
        margin: 0 -6px;
        width: 42px;
        height: 42px;
        box-sizing: border-box;
        outline: 2px solid rgb(98, 145, 161);
        background: url(),rgb(254, 245, 235);
        border-radius: 50%;

      }


      .avatar:first-child{
        box-sizing: border-box;
        outline: 2px solid rgb(255, 204, 77) !important;
        background: url(),rgb(254, 245, 235);
        border-radius: 50%;
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

