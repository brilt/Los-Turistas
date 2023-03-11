<template>
  <div>
    <h1>Hi {{ username }}</h1>
    <p>{{ secretMessage }}</p>
    <input type="button" value="Logout" @click="logout" />
  </div>
</template>

<script>
import AuthService from "../services/AuthServices";
import store from "../store";

export default {
  data() {
    return {
      secretMessage: "",
      username: "",
    };
  },
  async created() {
    if (!store.getters.isLoggedIn) {
      this.$router.push("/login");
    }

    this.username = store.getters.getUser.username;

    this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
    logout() {
      store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>
