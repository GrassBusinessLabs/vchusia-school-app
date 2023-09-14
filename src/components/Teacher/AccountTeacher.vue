<template>
    <ion-page>
      <ion-header>
        <ion-list>
          <ion-avatar class="ion-avatar-account">
            <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>

          </ion-avatar>
          <ion-buttons class="changeAvatar">
            <ion-button>Змінити аватар</ion-button>
          </ion-buttons>
          <ion-item>
            <ion-label>
              Мої дані
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              Змінити дані
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              Змінити пароль
            </ion-label>
          </ion-item>


        </ion-list>
      </ion-header>
    </ion-page>


</template>

<script lang="ts">
import {
  IonPage,
  IonHeader,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonButtons,
  IonButton,

} from "@ionic/vue";
import {defineComponent} from "vue";

export default defineComponent({
  name: 'AccountTeacher',
  components: {
    IonPage,
    IonHeader,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonButtons,
    IonButton,
  }
})

</script>

<style scoped>
ion-header{
  padding: 50px 5px;
}
.ion-avatar-account {
  margin: 0 auto;
  height: 128px;
  width: 128px;
}
.changeAvatar{
  display: flex;
  justify-content: center;
  padding: 20px;
}
</style>