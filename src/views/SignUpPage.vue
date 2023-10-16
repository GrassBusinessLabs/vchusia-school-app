<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-back-button default-href="/start" text="Назад"></ion-back-button>
        </ion-buttons>
        <ion-title>Реєстрація</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-list>
      <ion-input
          v-model="email"
          placeholder="admin@gmail.com"
          type="email"
          fill="solid"
          label="Електронна адреса"
          labelPlacement="floating"
          helperText="Введіть свою електронну адресу"
          errorText="Invalid email"
      ></ion-input>

      <ion-input
          placeholder="********"
          v-model="password"
          type="password"
          fill="solid"
          label="Пароль"
          labelPlacement="floating"
          helperText="Введіть пароль"
          errorText="Неправильний пароль"
      ></ion-input>

      <ion-radio-group value="custom-checked" v-model="this.role">
        <ion-radio value="STUDENT" aria-label="Custom checkbox">Студент</ion-radio>
        <ion-radio value="TEACHER" aria-label="Custom checkbox that is checked">Учитель</ion-radio>
      </ion-radio-group>

      <ion-input
          v-model="name"
          placeholder="Іван"
          type="text"
          fill="solid"
          label="Ім'я"
          labelPlacement="floating"
          helperText="Введіть своє ім'я"
          errorText="Введіть коректне ім'я"
      ></ion-input>

      <ion-input
          v-model="this.date"
          placeholder="1.01.2000"
          type="date"
          fill="solid"
          label="Дата народження"
          labelPlacement="floating"
          helperText="Виберіть свою дату народження"
          errorText="Введіть коректну дату"
      ></ion-input>

      <ion-buttons class="btn-log">
        <ion-button fill="solid" shape="round" size="large" color="success" @click="regSend">Зареєструватися
        </ion-button>
      </ion-buttons>
      <ion-text class="loginText">
        Вже маєте аккаунт? <a href="/login"> Увійти</a>
      </ion-text>
    </ion-list>
  </ion-page>
</template>

<script>
import {
  IonPage,
  IonInput,
  IonList,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonRadio,
  IonRadioGroup,
  IonText

} from "@ionic/vue";
import {defineComponent} from 'vue';
import {auth} from "../stores/auth";
// import router from "../router/index.js";


export default defineComponent({
  components: {
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonInput,
    IonList,
    IonHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    IonBackButton,
    IonText
  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      date: "",
      role: "",
      authStore: auth(),
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  methods: {
    async regSend() {
      let data = JSON.stringify({
        "email": this.email,
        "password": this.password,
        "name": this.name,
        "role": this.role
      });

      await this.authStore.signup({
        email: this.email,
        password: this.password,
        name: this.name,
        role: this.role
      });
    }
  }

});

</script>

<style scoped>
ion-radio {
  --border-radius: 4px;
  --inner-border-radius: 4px;

  --color: #ddd;
  --color-checked: #6815ec;
}

ion-radio.ios::part(container) {
  width: 20px;
  height: 20px;

  border: 2px solid #ddd;
  border-radius: 4px;
}

.radio-checked.ios::part(container) {
  border-color: #6815ec;
}

ion-header {
  margin-bottom: 50px;
}

ion-list {
  width: 90%;
  margin: auto;
}

.btn-log {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  height: 60px;
}

.btn-log ion-button {
  width: 100%;
  height: 50px;
}

ion-radio-group {
  display: flex;
  flex-direction: column;
}

ion-radio-group ion-radio {
  padding: 10px 0;
}

ion-text {
  display: flex;
  justify-content: center;
  margin-top: 25px;
}

.btnSignUp {
  height: 100px;
}
</style>