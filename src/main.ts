import Vue, {createApp} from 'vue'
import App from './App.vue'
import router from './router';
import {IonicVue} from '@ionic/vue';
import {createPinia} from "pinia";
import axios from "./http/api";

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import Toast from "vue-toastification";
import 'vue-toastification/dist/index.css'
/* Theme variables */
import './theme/variables.css';
import './assets/style.css'
const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia();

pinia.use((context) => {
    const storeId = context.store.$id

    console.log(storeId)

    const serilizer = {
        serialize: JSON.stringify,
        deserialize: JSON.parse
    }

    const fromStorage = serilizer.deserialize(window.localStorage.getItem(storeId))

    if(fromStorage){
        context.store.$patch(fromStorage)
    }

    context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, serilizer.serialize(state))
    })
})

const app = createApp(App)
    .use(IonicVue)
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(Toast)


// app.use(axios)
router.isReady().then(() => {
    app.mount('#app');
});

