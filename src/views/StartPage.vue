<template>
  <ion-page>
    <ion-header>
      <ion-thumbnail>
        <ion-img
            src="https://www.wi6labs.com/wp-content/uploads/2019/12/Machine-learning-logo-1.png"></ion-img>
      </ion-thumbnail>
    </ion-header>

    <ion-footer>
      <ion-buttons>
        <IonButton size="large" fill="solid" expand="block" color="success" class="btn-login" router-direction="forward" shape="round" @click="$router.push({name: 'Login'})">Вхід
        </IonButton>
      </ion-buttons>

      <ion-buttons>
        <IonButton size="large" fill="solid" expand="block" color="secondary" router-link="/signup" shape="round" class="btnReg">Реєстрація</IonButton>
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

export default {
  components: {
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
  width: 90%;
  margin: 0 auto;
  height: 60px;
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
}
ion-img{
  margin-top: 15px;
  width: 99%;
  height: 100%;
}
.btnReg{
  margin-bottom: 50px;
}
</style>
