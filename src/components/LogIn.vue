<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <img src="../assets/images/login.svg" />
      <h2>Login details</h2>

      <form @submit.prevent="handleSubmit">
        <label>Email:</label>
        <input
          type="email"
          required
          v-model="email"
          placeholder="exemple@gmail.com"
        />

        <label>Password:</label>
        <input type="password" required v-model="password" placeholder="Password" />
        <div v-if="passwordError" class="error">{{ passwordError }}</div>

        <div class="submit">
          <button class="login" @click="login">Login</button>
        </div>
      </form>
      <button
        style="background-color: transparent; border: 0"
        @click="openSignup"
      >
        Don't have an account?
      </button>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthServices";
import store from "../store";
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordError: "",
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
        };

        const response = await AuthService.login(credentials);
        const token = response.token;
        const user = response.user;

        store.dispatch("login", { token, user });
        this.closeModal();
        
      } catch (error) {
        this.passwordError = error.response.data.msg;
      }
      
    },
    closeModal() {
      this.$emit("close");
      console.log("reloading")
      window.location.reload();
    },
    openSignup() {
      this.$emit("openSignup");
      console.log("Open signup please");
    },
  },
};
</script>

<style>
form {
  max-width: 500px;
  background: rgba(0,0,0,0);
  text-align: left;
  border-radius: 10px;
}
label {
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input, select {
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 6px;
  color: #887e7e;
}
.login {
  background: #ff0000;
  border: 0;
  padding: 10px 20px;
  margin: 20px;
  color: white;
  border-radius: 10px;
}
.submit {
  text-align: center;
}
.error {
  color: #ff0062;
  margin-top: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
.modal {
  width: fit-content;
  height: fit-content;
  padding: 20px;
  padding-bottom: 5%;
  margin: 10px auto;
  background: white;
  background-repeat: no-repeat;
  background-position: bottom;
  border-radius: 10px;
  background-image: url("../assets/images/wave.svg");
  display: flex;
  flex-direction: column;
}
.backdrop {
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}
.modal h1 {
  border: none;
  padding: 0;
}
@media (max-width: 768px) {
  .login {
  background: #ff0000;
  border: 0;
  padding: 10px 20px;
  margin: 7px;
  color: white;
  border-radius: 10px;
}
}
</style>
