import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VueGoogleMaps from "@fawmi/vue-google-maps";

createApp(App)
  .use(router)
  .use(VueGoogleMaps, {
    load: {
      key: "AIzaSyApRohqBChX1TQQNn8-kulrwVSWtKuQnIc",
    },
  })
  .mount("#app");
