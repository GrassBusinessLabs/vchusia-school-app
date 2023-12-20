<script setup lang="ts">
import {
  IonMenuButton,
  IonPage,
  IonFooter,
  IonContent,
  IonRouterOutlet, IonHeader
} from "@ionic/vue";
import router from "@/router"
import {useRoute} from "vue-router";
import {ref} from "vue";
const title = ref('Стрічка')
const value = ref(1)

</script>

<template>
  <ion-page>

<ion-content>
  <ion-router-outlet/>


</ion-content>
    <ion-header>
      <div>
        <v-toolbar
            dark
            prominent
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2sH6GCGsggznPZO2w47ZcJCqZoujYffx6r-7eRwoxhC-nSviTTIDImt0kKVWf-gPZ1p4&usqp=CAU"
        >


          <v-toolbar-title>{{ title }}</v-toolbar-title>

        </v-toolbar>
      </div>
    </ion-header>

      <v-layout class="overflow-visible layout-footer">
        <v-bottom-navigation class="bottom-nav rounded custom" v-model="value" :grow='true' mode="shift">

          <v-btn class="btn-course-bottom btn-bottom-nav" @click="router.replace('/main/courses')">
            <template v-slot:append><v-icon icon="mdi-arrow-left" class="icon-course"/></template>
          </v-btn>


          <v-btn class="btn-course-bottom btn-bottom-nav" @click="router.push('/main/tape/tape'), title = 'Стрічка'">
           <v-icon icon="mdi-tooltip-check-outline" class="icon-course"/>
            <span>Стрічка</span>

          </v-btn>

          <v-btn class="btn-bottom-nav" @click="router.push('/main/tape/task'), title = 'Завдання'">
            <v-icon icon="mdi-calendar-check-outline"></v-icon>
            <span>Завдання</span>

          </v-btn>

          <v-btn class="btn-bottom-nav btn-menu-bottom" content-id="main-content">

           <ion-menu-button color="dark"></ion-menu-button>
            <span>Меню</span>

          </v-btn>

        </v-bottom-navigation>
      </v-layout>


  </ion-page>

</template>

<style scoped>
ion-item {
  cursor: pointer;
}

ion-item:active {
  color: #3a7be0;

}

ion-item:hover {
  color: #7d7d7d;

}


.layout-footer {
  max-height: 10vh;
  width: 100%;

}

.bottom-nav {
  display: flex;
  justify-content: center;
}

.btn-bottom-nav {
  color: #000;
}
.btn-bottom-nav span{
  font-weight: 900;
}
.btn-course-bottom span{
  margin-left: 20px;
}
.icon-course{
  margin-left: 20px;
}
ion-menu-button{
  height: 20px;
}
.btn-menu-bottom{
  margin-right: 10px;
}


                   .custom {
                     min-height: 67px;
                   }

span {
  font-size: 14px;
}

.v-bottom-navigation {
  z-index: 1;
}

</style>