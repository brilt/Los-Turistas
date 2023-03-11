<template>
  <div>
    <h1>Login</h1>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="text" placeholder="Password" v-model="password" />
    <input type="button" @click="login" value="Login" />
    <p>{{ msg }}</p>
  </div>
</template>
<script>
import AuthService from "../services/AuthServices";
import store from '../store'

export default {
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    async login() {
  try {
    const credentials = {
      username: this.username,
      password: this.password,
    };
    
    const response = await AuthService.login(credentials);
    const token = response.token;
    const user = response.user;

    store.dispatch("login", { token, user });

    this.$router.push("/secret");
  } catch (error) {
    this.msg = error.response.data.msg;
  }
},

  },
};
</script>
