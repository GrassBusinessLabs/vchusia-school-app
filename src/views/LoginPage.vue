<template>
  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

<!--    <ion-header >-->
<!--      <ion-toolbar>-->
<!--        <ion-title class="ml-4">Вхід</ion-title>-->
<!--      </ion-toolbar>-->
<!--    </ion-header>-->
<!--    <ion-list>-->
<!--      <div>-->
<!--        <v-img-->
<!--            class="mx-auto my-6"-->
<!--            max-width="228"-->
<!--            src="/Vchusia.png"-->
<!--        ></v-img>-->

<!--        <v-card-->
<!--            class="mx-auto pa-12 pb-8"-->
<!--            elevation="8"-->
<!--            max-width="448"-->
<!--            rounded="lg"-->
<!--        >-->
<!--          <div class="text-subtitle-1 text-medium-emphasis">Почта</div>-->

<!--          <v-text-field-->
<!--              prepend-inner-icon="mdi-email-outline"-->
<!--              density="compact"-->
<!--              placeholder="admin@gmail.com"-->
<!--              v-model="email"-->
<!--              variant="outlined"-->
<!--          ></v-text-field>-->

<!--          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">-->
<!--            Пароль-->
<!--          </div>-->
<!--          <v-text-field-->
<!--              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"-->
<!--              :type="visible ? 'text' : 'password'"-->
<!--              density="compact"-->
<!--              placeholder="********"-->
<!--              variant="outlined"-->
<!--              prepend-inner-icon="mdi-lock"-->
<!--              v-model="password"-->
<!--              @click:append-inner="visible = !visible"-->
<!--          ></v-text-field>-->

<!--          <v-card-->
<!--              class="mb-12"-->
<!--              color="surface-variant"-->
<!--              variant="tonal"-->
<!--          >-->
<!--          </v-card>-->

<!--          <v-btn-->
<!--              class="login mb-8"-->
<!--              color="blue"-->
<!--              size="large"-->
<!--              variant="tonal"-->
<!--              @click="login"-->
<!--          >-->
<!--            Увійти-->
<!--          </v-btn>-->

<!--          <v-card-text class="text-center">-->
<!--            <ion-text>Немає аккаунта?-->
<!--              <router-link to="/auth/signup">Зареєструватися</router-link>-->
<!--            </ion-text>-->
<!--          </v-card-text>-->
<!--        </v-card>-->
<!--      </div>-->

<!--    </ion-list>-->
    <div class="container">
      <div class="logo">
        <logo />
      </div>
      <div class="title-page">
        <h2>Вхід</h2>
      </div>

      <div class="form">
        <div class="email-card">
          <span>Пошта</span>
          <input class="email-input" v-model="email" placeholder="Введіть свою пошту" />
        </div>

        <div class="password-card">
          <span>Пароль</span>
          <input class="password-input"
                 v-model="password"
                 type="password"
                 placeholder="Введіть свій пароль"/>
        </div>

        <app-button @click="login">Увійти</app-button>
        <div class="login-card">
          <!--          <v-btn @click="login" class="btn-login">Увійти</v-btn>-->
          <button @click="$router.replace('/auth/signup')" class="btn-register">Реєстрація</button>
        </div>
      </div>
    </div>
  </ion-page>

</template>

<script lang="ts">
import {auth} from "../stores/auth";
import {
  IonPage,
  IonInput,
  IonList,
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonText

} from "@ionic/vue";
import {course} from "../stores/course.ts"
import Logo from "@/components/icons/logo.vue";
import AppButton from "@/components/app-components/app-button.vue";

export default {
  name: "LoginPage",
  components: {
    AppButton,
    Logo,
    IonPage,
    IonInput,
    IonList,
    IonHeader,
    IonToolbar,
    IonButton,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonText
  },

  data() {
    return {
      email: "",
      password: "",
      wrongData: "",
      token: null,
      authStore: auth(),
      courseStore: course(),
      visible: false
    }
  },
  methods: {

    isNotNull() {
      if (this.email === "" || this.password === "") {
        return this.wrongData = "Заповніть поля!"
      } else {
        return this.throwErrorFun();
      }
    },
    throwErrorFun() {
      return this.wrongData = "Неправильні дані!"
    },
    async login() {
      this.courseStore.total = 0;
      let data = JSON.stringify({
        "email": this.email,
        "password": this.password
      });

      await this.authStore.login({
        email: this.email,
        password: this.password,
      });
      this.email = "";
      this.password = ""
      this.isNotNull()


    }
  }
}
</script>

<style scoped>
.ion-page{
  background: rgb(255, 248, 237);
  overflow-y: auto;
}
.container{
  margin-top: 78px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & .title-page h2{
    margin-top: 72px;
    color: rgb(205, 150, 129);
    font-size: 32px;
    font-weight: 700;
    line-height: 39px;
    text-align: center;
  }
  & .form{
    margin-top: 48px;
    width: 90%;

    & .email-card span{
      color: rgb(66, 126, 154);
      padding: 0px 0px 0px 16px;
      font-size: 18px;
      font-weight: 700;
      line-height: 22px;
      text-align: left;
    }

    & .email-input{
      color: rgb(66, 126, 154);
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      text-align: left;
      margin: 8px 0px;
      padding: 16px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      outline: none;
      width: 90%;
      border-radius: 16px;
      box-shadow: inset 0px 4px 2px 0px rgba(0, 0, 0, 0.05),inset 0px -2px 1px 0px rgb(255, 255, 255);
      background: linear-gradient(180.00deg, rgb(255, 248, 237),rgb(255, 254, 253) 199.02%);
    }
  }
  & .password-card{
    margin-top: 24px;
  }

  & .password-input{
    color: rgb(66, 126, 154);
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: left;
    margin: 8px 0px;
    padding: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    outline: none;
    width: 90%;
    border-radius: 16px;
    box-shadow: inset 0px 4px 2px 0px rgba(0, 0, 0, 0.05),inset 0px -2px 1px 0px rgb(255, 255, 255);
    background: linear-gradient(180.00deg, rgb(255, 248, 237),rgb(255, 254, 253) 199.02%);
  }

  & .password-card span{
    color: rgb(66, 126, 154);
    padding: 0px 0px 0px 16px;
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    text-align: left;
  }
}

.login-card{
  margin: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & .btn-login{
    width: 100%;
    margin-bottom: 32px;
    border-radius: 43px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5),inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25),0px 4px 8px 0px rgba(169, 163, 157, 0.25),0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgb(66, 126, 154);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 34px 12px 34px;
    color: rgb(255, 248, 237);
    text-transform: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: center;

  }

  & .btn-register{
    color: rgb(205, 150, 129);
    font-size: 18px;
    font-weight: 400;
    line-height: 22px;
    text-align: left;
  }
}

.email-input::placeholder{
  color: rgb(164, 202, 224);
}
.password-input::placeholder{
  color: rgb(164, 202, 224);
}
</style>