<template>

  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

<!--    <ion-header>-->
<!--      <ion-toolbar>-->
<!--        <ion-title class="ml-4">Реєстрація</ion-title>-->
<!--      </ion-toolbar>-->
<!--    </ion-header>-->
<!--    <ion-content>-->
<!--      <ion-list>-->

<!--        <div>-->
<!--          <v-img-->
<!--              class="mx-auto my-6"-->
<!--              max-width="200"-->
<!--              src="/Vchusia.png"-->
<!--          ></v-img>-->

<!--          <v-card-->
<!--              class="mx-auto pa-6 pb-8"-->
<!--              elevation="8"-->
<!--              max-width="448"-->
<!--              rounded="lg"-->
<!--          >-->
<!--            <div class="text-subtitle-1 text-medium-emphasis">Email</div>-->
<!--            <v-text-field-->
<!--                prepend-inner-icon="mdi-email-outline"-->
<!--                v-model="email"-->
<!--                density="compact"-->
<!--                type="email"-->
<!--                placeholder="admin@gmail.com"-->
<!--                variant="outlined"-->
<!--            ></v-text-field>-->

<!--            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">-->
<!--              Пароль-->
<!--            </div>-->

<!--            <v-text-field-->
<!--                prepend-inner-icon="mdi-lock"-->
<!--                v-model="password"-->
<!--                density="compact"-->
<!--                placeholder="********"-->
<!--                variant="outlined"-->
<!--                @click:append-inner="visible = !visible"-->
<!--                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"-->
<!--                :type="visible ? 'text' : 'password'"-->
<!--                validate-on="input"-->
<!--                :error="password.length < 4 && password.length > 0"-->
<!--            >-->
<!--              <template v-slot:details>-->
<!--                <span v-if="password.length < 4 && password.length > 0" class="error-valid">Пароль повинен містити не менш ніж 4 символи</span>-->
<!--              </template>-->

<!--            </v-text-field>-->


<!--            <div class="text-subtitle-1 text-medium-emphasis">Роль</div>-->


<!--            <v-radio-group v-model="this.role">-->
<!--              <v-radio label="Студент" value="STUDENT" aria-label="Custom checkbox" color="indigo"></v-radio>-->
<!--              <v-radio label="Викладач" value="TEACHER" aria-label="Custom checkbox that is checked"-->
<!--                       color="indigo"></v-radio>-->
<!--            </v-radio-group>-->

<!--            <div class="text-subtitle-1 text-medium-emphasis">Ім'я</div>-->

<!--            <v-text-field-->
<!--                prepend-inner-icon="mdi-account"-->
<!--                v-model="name"-->
<!--                density="compact"-->
<!--                placeholder="Іван"-->
<!--                variant="outlined"-->
<!--            ></v-text-field>-->

<!--            <v-btn-->
<!--                class="mb-8 btnSignUp"-->
<!--                color="blue"-->
<!--                size="large"-->
<!--                variant="tonal"-->
<!--                @click="regSend"-->
<!--            >-->
<!--              Зареєструватися-->
<!--            </v-btn>-->

<!--            <ion-text class="loginText">-->
<!--              Вже маєте аккаунт? <a href="/auth/login"> Увійти</a>-->
<!--            </ion-text>-->
<!--          </v-card>-->
<!--        </div>-->
<!--      </ion-list>-->
<!--    </ion-content>-->
    <div class="container">
      <div class="logo">
        <logo />
      </div>
      <div class="title-page">
        <h2>Реєстрація</h2>
      </div>

      <div class="form">
        <div class="name-card">
          <span>Ім'я</span>
          <input class="name-input" v-model="name" placeholder="Введіть своє ім'я" />
        </div>

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

        <div class="role-card">
          <span class="default-check">Студент</span>
          <ion-toggle class="switch-role" mode="ios" v-model="roleValue"></ion-toggle>
          <span>Викладач</span>

        </div>



        <div class="signup-card">
          <v-btn @click="regSend" class="btn-register">Створити обілковий запис</v-btn>
          <button @click="$router.replace('/auth/login')" class="btn-login">Вхід</button>
        </div>
      </div>
    </div>

  </ion-page>
</template>

<script lang="ts">
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
  IonText,
    IonTitle,
    IonContent,
  IonToggle

} from "@ionic/vue";
import {defineComponent, ref} from 'vue';
import {auth} from "../stores/auth";
import Logo from "/src/components/icons/logo.vue";
// import router from "../router/index.js";

export default defineComponent({
  components: {
    Logo,
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
    IonText,
    IonTitle,
    IonContent,
    IonToggle

  },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      date: "",
      role: "",
      authStore: auth(),
      visible: false,
      user: JSON.parse(localStorage.getItem('user')),
      roleValue: ref(false),
      roleReq: ref('STUDENT')
    }
  },
  methods: {
    async regSend() {
      if (this.password.length < 4) {
        console.error('Пароль повинен містити принаймні 4 символи.');
        return;
      }

      if (this.roleValue === true){
        this.roleReq = 'TEACHER'
      }


      await this.authStore.signup({
        email: this.email,
        password: this.password,
        name: this.name,
        role: this.roleReq
      });
    }
  }

});

</script>

<style scoped>
.ion-page{
  background: rgb(255, 248, 237);
  overflow-y: auto;
}

.container {
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

  & .form {
    margin-top: 48px;
    width: 90%;

    & .name-card span{
      color: rgb(66, 126, 154);
      padding: 0px 0px 0px 16px;
      font-size: 18px;
      font-weight: 700;
      line-height: 22px;
      text-align: left;
    }

    & .name-input{
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

.role-card{
  display: flex;
  justify-content: center;
  align-items: center;
  & .default-check{
    color: rgb(205, 150, 129);
  }
  & span{
    color: rgb(66, 126, 154);
    font-size: 18px;
    font-weight: 700;
    line-height: 22px;
    text-align: left;
  }

  .switch-role {
    border-radius: 63px;
    box-shadow: inset 0px 2px 2px 0px rgba(0, 0, 0, 0.1),inset 0px -2px 1px 0px rgb(255, 255, 255);
    background: rgb(254, 245, 235);
    --handle-background: rgb(66, 126, 154);
    margin: 32px 24px;
    --handle-background-checked: rgb(254, 245, 235);
    --track-background-checked: rgb(66, 126, 154);
    --handle-box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5),inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25),0px 4px 8px 0px rgba(169, 163, 157, 0.25),0px -2px 8px 0px rgba(0, 0, 0, 0.04);


  }
}

.signup-card{
  display: flex;
  flex-direction: column;
  gap: 32px;
  .btn-register{
    color: rgb(255, 248, 237);
    text-transform: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 19px;
    text-align: center;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 12px 34px 12px 34px;
    border-radius: 43px;
    box-shadow: inset 0px 1px 1px 1px rgba(255, 255, 255, 0.5),inset 0px -2px 1px 0px rgba(0, 0, 0, 0.25),0px 4px 8px 0px rgba(169, 163, 157, 0.25),0px -2px 8px 0px rgba(0, 0, 0, 0.04);
    background: rgb(66, 126, 154);
  }
}

.btn-login{
  color: rgb(205, 150, 129);
  font-size: 18px;
  font-weight: 400;
  line-height: 22px;
  text-align: center;
  margin-bottom: 48px;
}

.name-input::placeholder{
  color: rgb(164, 202, 224);
}
.email-input::placeholder{
  color: rgb(164, 202, 224);
}
.password-input::placeholder{
  color: rgb(164, 202, 224);
}
</style>