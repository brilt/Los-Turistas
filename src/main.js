import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from 'vue-google-maps-community-fork'
import Post from './components/Post.vue'
import store from "./store";
import Axios from 'axios';

// set auth header
Axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;


createApp(App)
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: "key",
    },
  })
  .component('Post',Post)
  .mount("#app");
