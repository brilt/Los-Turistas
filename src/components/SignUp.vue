<template>
  <div class="backdrop" @click.self="closeModal">
    <div class="modal">
      <img src="../assets/images/login.svg" width="300" height="100" />
      <h2>Create an account</h2>

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
          <button class="login" @click="signUp">Create account</button>
        </div>
      </form>
      <button
        style="background-color: transparent; border: 0"
        @click="openLogIn"
      >
        Already have an account?
      </button>
    </div>
  </div>
</template>

<script>
import AuthService from "../services/AuthServices";
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
    openLogIn() {
      this.$emit("openLogIn");
      console.log("Open LogIn please");
    },
  },
};
</script>
