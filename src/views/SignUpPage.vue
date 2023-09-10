<template>
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
        label="Email"
        labelPlacement="floating"
        helperText="Enter a valid email"
        errorText="Invalid email"
    ></ion-input>

    <ion-input
        placeholder="********"
        v-model="password"
        type="password"
        fill="solid"
        label="Password"
        labelPlacement="floating"
        helperText="Enter a valid password"
        errorText="Invalid password"
    ></ion-input>

    <ion-radio-group value="custom-checked">
      <ion-radio value="custom" aria-label="Custom checkbox">Студент</ion-radio>
      <ion-radio value="custom-checked" aria-label="Custom checkbox that is checked">Учитель</ion-radio>
    </ion-radio-group>

    <ion-input
        v-model="name"
        placeholder="Іван"
        type="text"
        fill="solid"
        label="Name"
        labelPlacement="floating"
        helperText="Enter a your name"
        errorText="Enter a correct name"
    ></ion-input>

    <ion-input
        v-model="this.date"
        placeholder="1.01.2000"
        type="date"
        fill="solid"
        label="Date of birth"
        labelPlacement="floating"
        helperText="Choose a you date of birth"
        errorText="Enter a correct date"
    ></ion-input>

    <ion-buttons class="btn-log">
      <ion-button fill="outline" size="large" @click="regSend">Зареєструватися</ion-button>
    </ion-buttons>
    <ion-text class="loginText">
      Вже маєте аккаунт? <a href="/start/login">Увійти</a>
    </ion-text>
  </ion-list>
</template>

<script>
import {
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
import axios from 'axios'

export default defineComponent({
  components: {
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
      date: ""
    }
  },
  methods: {
    nullInputs(){
      this.email = "";
      this.password = "";
      this.name = "";
      this.date = ""
    },


    regSend() {
      let data = JSON.stringify({
        "email": this.email,
        "password": this.password,
        "name": this.name
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://vchusia.grassbusinesslabs.tk/api/v1/auth/register',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            this.nullInputs();

          })
          .catch((error) => {
            console.log(error);
            this.nullInputs();
          });


    }
  }


})
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
  margin: 0 auto;
}

.btn-log {
  display: flex;
  justify-content: center;
  margin-top: 30px;
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
</style>