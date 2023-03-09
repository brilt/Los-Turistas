import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from 'vue-google-maps-community-fork'
import Post from './components/Post.vue'


createApp(App)
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyApRohqBChX1TQQNn8-kulrwVSWtKuQnIc",
    },
  })
  .component('Post',Post)
  .mount("#app");
