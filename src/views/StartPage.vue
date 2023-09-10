<template>
  <ion-page>
    <ion-header>
      <ion-thumbnail>
        <ion-img
            src="https://img.freepik.com/premium-vector/teacher-school-with-chalkboard-avatar-character_24877-1548.jpg"></ion-img>
      </ion-thumbnail>
    </ion-header>

    <ion-footer>
      <ion-buttons>
        <IonButton size="large" fill="outline" expand="block" color="success" class="btn-login" router-direction="forward" href="/start/login">Вхід
        </IonButton>
      </ion-buttons>

      <ion-buttons>
        <IonButton size="large" fill="solid" expand="block" color="secondary" href="/start/signup">Реєстрація</IonButton>
      </ion-buttons>

    </ion-footer>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonButtons,
  IonButton,
  IonThumbnail,
  IonFooter,
  IonHeader
} from '@ionic/vue';
import LoginPage from "@/views/LoginPage.vue";

export default {
  components: {
    LoginPage,
    IonPage,
    IonButtons,
    IonButton,
    IonThumbnail,
    IonFooter,
    IonHeader
  },
}


</script>

<style scoped>

ion-button {
  --padding-top: 10px;
  --padding-bottom: 10px;
  width: 100%;
}

.btn-login {
  margin-bottom: 15px;

}

ion-thumbnail {
  position: relative;
  top: 5%;
  left: 5%;
  width: 90%;
  height: 90%;
  --border-radius: 360px;
}
</style>
