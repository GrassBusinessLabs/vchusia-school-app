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

        <ion-accordion-group>
          <ion-accordion>
            <ion-item slot="header" color="light">
              <ion-label>Мої дані</ion-label>
            </ion-item>
            <div class="ion-padding" slot="content">Ім'я: {{ user?.name }}</div>
            <div class="ion-padding" slot="content">Email: {{ user?.email }}</div>
          </ion-accordion>
          <ion-item>
            <ion-button class="btn-changes">Змінити пароль</ion-button>
            <ion-button class="btn-changes">Редагувати дані</ion-button>
          </ion-item>
        </ion-accordion-group>


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
  IonAccordion,
  IonAccordionGroup

} from "@ionic/vue";
import {defineComponent} from "vue";
import MyPerson from "@/components/Teacher/details/MyPerson.vue";
import {auth} from "@/stores/auth";


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
    MyPerson,
    IonAccordion,
    IonAccordionGroup
  },

  data() {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },

  methods: {}
})


</script>

<style scoped>
ion-header {
  padding: 50px 5px;
}

.ion-avatar-account {
  margin: 0 auto;
  height: 128px;
  width: 128px;
}

.changeAvatar {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.btn-changes {
  width: 100%;
  height: 30px;
}
</style>