<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <v-img
          class="mx-auto my-12"
          max-width="228"
          src="/src/assets/Vchusia.png"
      ></v-img>
    </ion-header>


    <v-card class="container-btn">
      <v-btn
          class="text-none mb-4 btn"
          color="indigo"
          size="x-large"
          rounded
          @click="$router.push({name: 'SignUp'})"
      >
        Зареєструватися
      </v-btn>

      <v-btn
          class="text-none mb-4 btn"
          color="cyan-lighten-1"
          size="x-large"
          rounded
          @click="$router.replace('login')"

      >
        Увійти
      </v-btn>
    </v-card>

  </ion-page>
</template>

<script lang="ts">
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


.btn{
  width: 80%;
  margin: 0 auto;
}

.container-btn{
  display: flex;
  justify-content: center;
  flex-direction: column;
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

</style>
