<!--<template>-->

<!--  <ion-page>-->
<!--    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">-->
<!--    <ion-menu content-id="main-content" class="menu" side="end">-->
<!--      <ion-header>-->
<!--        <v-toolbar-->
<!--            dark-->
<!--            prominent-->
<!--            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sH6GCGsggznPZO2w47ZcJCqZoujYffx6r-7eRwoxhC-nSviTTIDImt0kKVWf-gPZ1p4&usqp=CAU"-->
<!--        >-->

<!--          <v-toolbar-title>Меню</v-toolbar-title>-->

<!--        </v-toolbar>-->
<!--      </ion-header>-->
<!--      <v-card>-->
<!--        <v-layout>-->
<!--          <v-navigation-drawer-->
<!--              class="nav-menu"-->
<!--              permanent-->
<!--          >-->
<!--            <v-divider></v-divider>-->

<!--            <v-list nav class="list-menu">-->
<!--              <v-list-item title="Обліковий запис" value="account"-->
<!--                           @click.prevent="activePage = 'Обліковий запис'"></v-list-item>-->
<!--              <v-list-item title="Курси" value="course" @click.prevent="activePage = 'Курси'"></v-list-item>-->
<!--              <v-list-item title="Завдання" value="task" @click.prevent="activePage = 'Завдання'"></v-list-item>-->
<!--              <v-list-item title="Групи" value="groups" @click.prevent="activePage = 'Групи'"></v-list-item>-->
<!--              <v-list-item title="Учні" value="pupils" @click.prevent="activePage = 'Учні'"></v-list-item>-->

<!--            </v-list>-->
<!--            <v-footer class="footerMenu">-->
<!--              <v-btn variant="outlined" color="light-blue-lighten-1" @click="authStore.logout()" class="logout-btn">-->
<!--                Вийти-->
<!--              </v-btn>-->
<!--            </v-footer>-->

<!--          </v-navigation-drawer>-->

<!--        </v-layout>-->
<!--      </v-card>-->
<!--    </ion-menu>-->

<!--    <ion-page id="main-content">-->
<!--      <ion-header>-->
<!--        <div>-->
<!--          <v-toolbar-->
<!--              dark-->
<!--              prominent-->
<!--              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sH6GCGsggznPZO2w47ZcJCqZoujYffx6r-7eRwoxhC-nSviTTIDImt0kKVWf-gPZ1p4&usqp=CAU"-->
<!--          >-->


<!--            <v-toolbar-title>{{ this.activePage }}</v-toolbar-title>-->

<!--          </v-toolbar>-->
<!--        </div>-->
<!--      </ion-header>-->
<!--      <ion-content class="ion-padding">-->
<!--        <AccountStudent v-if="activePage === 'Обліковий запис'"/>-->
<!--        <CourseStudent v-if="activePage === 'Курси'"/>-->
<!--      </ion-content>-->
<!--      <v-layout class="overflow-visible layout-footer">-->
<!--        <v-bottom-navigation class="bottom-nav" mode="shift" v-model="value"-->
<!--                             :bg-color="color">-->
<!--          <v-btn class="btn-course-bottom btn-bottom-nav" @click.prevent="activePage = 'Курси'">-->
<!--            <v-icon icon="mdi-book" class="icon-course"/>-->
<!--            <span>Курси</span>-->
<!--          </v-btn>-->

<!--          <v-btn class="btn-bottom-nav" @click.prevent="activePage = 'Завдання'">-->
<!--            <v-icon icon="mdi-clipboard-edit"></v-icon>-->

<!--            <span>Завдання</span>-->
<!--          </v-btn>-->

<!--          <v-btn class="btn-bottom-nav" @click.prevent="activePage = 'Групи'">-->
<!--            <v-icon icon="mdi-account-group"></v-icon>-->

<!--            <span>Групи</span>-->
<!--          </v-btn>-->

<!--          <v-btn class="btn-bottom-nav btn-menu-bottom" content-id="main-content">-->
<!--            <ion-menu-button color="dark" ></ion-menu-button>-->
<!--            <span>Меню</span>-->
<!--          </v-btn>-->
<!--        </v-bottom-navigation>-->
<!--      </v-layout>-->

<!--    </ion-page>-->
<!--  </ion-page>-->

<!--</template>-->

<!--<script lang="ts">-->
<!--import {defineComponent} from 'vue';-->

<!--import {ref} from "vue";-->
<!--import {auth} from "@/stores/auth";-->

<!--import {-->
<!--  IonButtons,-->
<!--  IonContent,-->
<!--  IonHeader,-->
<!--  IonMenu,-->
<!--  IonMenuButton,-->
<!--  IonPage,-->
<!--  IonTitle,-->
<!--  IonToolbar,-->
<!--  IonList,-->
<!--  IonLabel,-->
<!--  IonItem,-->
<!--  IonFooter,-->
<!--  IonButton,-->
<!--  IonIcon-->
<!--} from "@ionic/vue";-->
<!--import AccountStudent from "@/components/Student/AccountStudent.vue";-->
<!--import CourseStudent from "@/components/Student/CourseStudent.vue";-->

<!--export default defineComponent({-->

<!--  components: {-->
<!--    CourseStudent,-->
<!--    AccountStudent,-->
<!--    IonButtons,-->
<!--    IonContent,-->
<!--    IonHeader,-->
<!--    IonMenu,-->
<!--    IonMenuButton,-->
<!--    IonPage,-->
<!--    IonTitle,-->
<!--    IonToolbar,-->
<!--    IonList,-->
<!--    IonLabel,-->
<!--    IonItem,-->
<!--    IonFooter,-->
<!--    IonButton,-->
<!--    IonIcon,-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      activePage: ref("Курси"),-->
<!--      authStore: auth(),-->
<!--      value: 1-->
<!--    }-->
<!--  },-->
<!--  computed: {-->
<!--    color () {-->
<!--      switch (this.value) {-->
<!--        case 0: return '#d1d1d1'-->
<!--        case 1: return '#d0f2f7'-->
<!--        case 2: return '#f7f6c3'-->
<!--        case 3: return '#ecd6ff'-->
<!--        default: return '#baf5e9'-->
<!--      }-->
<!--    },-->
<!--  },-->

<!--})-->


<!--</script>-->

<!--<style scoped>-->
<!--.footerMenu {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  margin-top: 30px;-->
<!--  margin-bottom: 30px;-->
<!--}-->

<!--ion-item {-->
<!--  cursor: pointer;-->
<!--}-->

<!--ion-item:active {-->
<!--  color: #3a7be0;-->

<!--}-->

<!--ion-item:hover {-->
<!--  color: #7d7d7d;-->

<!--}-->

<!--.btns-out {-->
<!--  width: 90%;-->
<!--}-->

<!--.logout-btn {-->
<!--  width: 90%;-->
<!--  border-radius: 15px;-->
<!--}-->

<!--.list-menu {-->
<!--  margin-top: 30%;-->
<!--}-->

<!--.layout-footer {-->
<!--  max-height: 10vh;-->
<!--  width: 100%;-->

<!--}-->

<!--.bottom-nav {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--}-->

<!--.btn-bottom-nav {-->
<!--  color: #000;-->
<!--}-->
<!--.btn-bottom-nav span{-->
<!--  padding-top: 10px;-->
<!--  font-weight: 900;-->
<!--}-->
<!--.btn-course-bottom span{-->
<!--  margin-left: 20px;-->
<!--}-->
<!--.icon-course{-->
<!--  margin-left: 20px;-->
<!--}-->


<!--</style>-->