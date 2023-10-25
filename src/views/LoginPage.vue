<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button default-href="/start" text="Назад"></ion-back-button>
        </ion-buttons>
        <ion-title>Вхід</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-list>
      <div>
        <v-img
            class="mx-auto my-6"
            max-width="228"
            src="https://www.twine.net/blog/wordpress/wp-content/uploads/2022/03/tresorit.png"
        ></v-img>

        <v-card
            class="mx-auto pa-12 pb-8"
            elevation="8"
            max-width="448"
            rounded="lg"
        >
          <div class="text-subtitle-1 text-medium-emphasis">Почта</div>

          <v-text-field
              density="compact"
              placeholder="admin@gmail.com"
              v-model="email"
              variant="outlined"
          ></v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Пароль
          </div>
          <v-text-field
              type="password"
              density="compact"
              placeholder="********"
              variant="outlined"
              v-model="password"
          ></v-text-field>

          <v-card
              class="mb-12"
              color="surface-variant"
              variant="tonal"
          >
          </v-card>

          <v-btn
              class="login mb-8"
              color="blue"
              size="large"
              variant="tonal"
              @click="login"
          >
            Увійти
          </v-btn>

          <v-card-text class="text-center">
            <ion-text>Немає аккаунта? <router-link to="/signup">Зареєструватися</router-link></ion-text>
          </v-card-text>
        </v-card>
      </div>

    </ion-list>
  </ion-page>

</template>

<script>
import {auth} from "../stores/auth";
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
import {course} from "../stores/course.ts"

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
      token: null,
      authStore: auth(),
      courseStore: course(),

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
ion-header {
  margin-bottom: 50px;
}

ion-list {
  width: 90%;
  margin: auto;
}

.btn-log ion-button {
  width: 100%;
  height: 50px;
}


.login{
  display: flex;
  margin: 0 auto;
  width: 80%;
}
</style>