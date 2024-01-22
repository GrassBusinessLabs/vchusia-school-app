<template>

  <ion-page>
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet">

    <ion-header>
      <ion-toolbar>
        <ion-title class="ml-4">Реєстрація</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <div>
          <v-img
              class="mx-auto my-6"
              max-width="200"
              src="/src/assets/Vchusia.png"
          ></v-img>

          <v-card
              class="mx-auto pa-6 pb-8"
              elevation="8"
              max-width="448"
              rounded="lg"
          >
            <div class="text-subtitle-1 text-medium-emphasis">Email</div>
            <v-text-field
                prepend-inner-icon="mdi-email-outline"
                v-model="email"
                density="compact"
                type="email"
                placeholder="admin@gmail.com"
                variant="outlined"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
              Пароль
            </div>

            <v-text-field
                prepend-inner-icon="mdi-lock"
                v-model="password"
                density="compact"
                placeholder="********"
                variant="outlined"
                @click:append-inner="visible = !visible"
                :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible ? 'text' : 'password'"
            ></v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis">Роль</div>


            <v-radio-group v-model="this.role">
              <v-radio label="Студент" value="STUDENT" aria-label="Custom checkbox" color="indigo"></v-radio>
              <v-radio label="Викладач" value="TEACHER" aria-label="Custom checkbox that is checked"
                       color="indigo"></v-radio>
            </v-radio-group>

            <div class="text-subtitle-1 text-medium-emphasis">Ім'я</div>

            <v-text-field
                prepend-inner-icon="mdi-account"
                v-model="name"
                density="compact"
                placeholder="Іван"
                variant="outlined"
            ></v-text-field>

            <v-btn
                class="mb-8 btnSignUp"
                color="blue"
                size="large"
                variant="tonal"
                @click="regSend"
            >
              Зареєструватися
            </v-btn>

            <ion-text class="loginText">
              Вже маєте аккаунт? <a href="/auth/login"> Увійти</a>
            </ion-text>
          </v-card>
        </div>
      </ion-list>
    </ion-content>

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
    IonContent

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
    IonText,
    IonTitle,
    IonContent
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
  display: flex;
  margin: 0 auto;
  width: 85%;
  border-radius: 15px;
}
</style>