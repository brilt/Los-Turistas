<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <img src="../assets/images/login.svg" width="300" height="100" />
      <h2>Crear una cuenta</h2>

      <form @submit.prevent="handleSubmit">
        <label>Email:</label>
        <input
          type="email"
          required
          v-model="email"
          placeholder="exemple@gmail.com"
        />

        <label>Password:</label>
        <input
          type="password"
          placeholder="Password"
          required
          v-model="password"
        />
        <label>Repeat password:</label>
        <input
          type="password"
          placeholder="Password (repeat)"
          v-model="password_repeat"
        />
        <div v-if="passwordError" class="error">{{ passwordError }}</div>

        <div class="submit">
          <button class="login" @click="signUp">Crear cuenta</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthServices";
import store from "../store";
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: "",
      passwordError: "",
      password_repeat: "",
    };
  },
  methods: {
    async signUp() {
      try {
        const credentials = {
          email: this.email,
          password: this.password,
          password_repeat: this.password_repeat,
        };
        const response = await AuthService.signUp(credentials);
        this.passwordError = response.msg;
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
  },
};
</script>

<style>
/*
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
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
input,
select {
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
  margin-top: 20px;
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
  width: 400px;
  height: auto;
  padding: 20px;
  padding-bottom: 5%;
  margin: 50px auto;
  background: white;
  background-repeat: no-repeat;
  background-position: bottom;
  border-radius: 10px;
  background-image: url("../assets/images/wave.svg");
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
}*/
</style>
