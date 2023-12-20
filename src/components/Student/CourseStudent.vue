<template>
  <ion-page>

    <ion-header>
      <ion-item>
        <ion-searchbar animated="animated" placeholder="Пошук по курсах"></ion-searchbar>
      </ion-item>
    </ion-header>


    <ion-content>


    </ion-content>
    <ion-footer>

    </ion-footer>

  </ion-page>


</template>


<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import {add} from 'ionicons/icons';
import {
  IonButtons,
  IonHeader,
  IonContent,
  IonInput,
  IonItem,
  IonSearchbar,
  IonFooter,
  IonFab,
  IonFabButton,
  IonButton,
  IonIcon,
  IonLabel,
  IonPage,
  IonModal,
  IonToolbar,
  IonTitle
} from "@ionic/vue";
import {course} from "@/stores/course";
import {Course} from "@/models/Course";


const CourseStore = course()


</script>

<style scoped>

.course {
  padding: 15px;
  width: 80%;
  margin: 15px auto;
  color: #fff;
  background: rgb(0, 75, 171);
  background: url(https://cdn.pixabay.com/photo/2016/11/29/01/13/background-1866485_1280.jpg);
  border-radius: 15px;
}

.container-modal {
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
}

.titlesCourse {
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-weight: 700;
}

.valueCourse {
  color: #9ae6c4;
  font-size: 18px;
  font-family: "Fira Code Medium", monospace;

}

.courses-content {
  padding: 4px 15px;
}

ion-fab {
  position: relative;
  left: 44%;
}

.footer-toolbar {
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 5vh;
}

v-btn {
  margin: 0 auto;
}

.btn-add-course {
  min-width: 30px;
  border-radius: 50px;
  margin-top: 10px;
}

.add-course {
  margin-right: 15px;
}

.confirm-btn {
  border-radius: 20px;
  padding: 5px 10px;
}

</style>