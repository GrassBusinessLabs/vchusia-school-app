<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/" text="Назад"></ion-back-button>
        </ion-buttons>
        <ion-title>Вхід</ion-title>
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
          helperText="Введіть свою пошту"
          errorText="Неправильний email"
          required
      ></ion-input>

      <ion-input
          v-model="password"
          placeholder="********"
          type="password"
          fill="solid"
          label="Пароль"
          labelPlacement="floating"
          helperText="Введіть свій пароль"
          errorText="Неправильний пароль"
          required
      ></ion-input>

      <ion-buttons class="btn-log">
        <ion-button fill="solid" size="large" @click="login" shape="round" >Увійти</ion-button>
      </ion-buttons>
      <input type="text" v-model="wrongData" class="textForError" disabled>
    </ion-list>
  </ion-page>

</template>

<script>
import axios from "axios";
import {
  IonPage,
  IonInput,
  IonList,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton

} from "@ionic/vue";

export default {
  name: "LoginPage",
  components: {
    IonPage,
    IonInput,
    IonList,
    IonHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    IonBackButton
  },
  data() {
    return {
      email: "",
      password: "",
      wrongData: "",
      token: null
    }
  },
  methods: {
    isNotNull(){
      if(this.email === "" || this.password === ""){
        return this.wrongData = "Заповніть поля!"
      }
      else{
        return this.throwErrorFun();
      }
    },

    successLogin(){
      window.location.href = '/teacher-room'
    },

    throwErrorFun(){
      return this.wrongData = "Неправильні дані!"
    },

    login() {
      let data = JSON.stringify({
        "email": this.email,
        "password": this.password
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://vchusia.grassbusinesslabs.tk/api/v1/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      const token = '';
      axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
            this.token = JSON.stringify(response.data.token)
            this.email = "";
            this.password = "";
            this.wrongData = "";
            console.log(this.token);
            localStorage.setItem('token', JSON.stringify(response.data.token))
            // this.successLogin();

          })
          .catch((error) => {
            console.log(error);
            this.isNotNull();
            this.email = "";
            this.password = "";

          });
    },


  }


}
</script>

<style scoped>
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
}

.btn-log ion-button {
  width: 100%;
  height: 50px;
}

.textForError{
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
  text-align: center;
  margin-top: 20px;
  color: red;
}
</style>