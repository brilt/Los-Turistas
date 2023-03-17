<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <img src="../assets/images/login.svg" />
      <h2>Datos de acceso</h2>

      <form @submit.prevent="handleSubmit">
        <label>Email:</label>
        <input
          type="email"
          required
          v-model="email"
          placeholder="exemple@gmail.com"
        />

        <label>Password:</label>
        <input type="password" required v-model="password" />
        <div v-if="passwordError" class="error">{{ passwordError }}</div>

        <div class="submit">
          <button class="login" @click="login">Iniciar sesión</button>
        </div>
      </form>
      <button
        style="background-color: transparent; border: 0"
        @click="openSignup"
      >
        ¿No tienes una cuenta?
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
        this.$router.push("/secret");
      } catch (error) {
        this.passwordError = error.response.data.msg;
      }
    },
    closeModal() {
      this.$emit("close");
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
  max-width: 420px;
  background: white;
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
  margin: 2em;
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
  margin: 50px auto;
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
</style>
