<template>
  <nav>
    <div class="links">
      <img id="logo" src="./assets/images/los-turistas-logo.png" alt="" />
      <router-link to="/">Página Principal</router-link>
      <router-link to="/favoritos">Favoritos</router-link>
    </div>

    <button v-if="isLoggedIn" class="login" @click="logOut">
      Hola amigo, click to logout
    </button>
    <button v-else class="login" @click="toggleLogIn">Iniciar sesión</button>
  </nav>
  <LogIn
    @close="toggleLogIn"
    @openSignup="toggleSignup"
    v-if="showLogIn"
    style="z-index: 1000"
  />
  <SignUp
    @close="toggleSignup"
    @openLogIn="toggleLogIn"
    v-if="showSignup"
    style="z-index: 1000"
  />

  <router-view />
</template>

<script>
import LogIn from "./components/LogIn.vue";
import Post from "./components/Post.vue";
import SignUp from "./components/SignUp.vue";

import store from "./store";

export default {
  components: {
    LogIn,
    Post,
    SignUp,
  },
  computed: {
    isLoggedIn() {
      return store.getters.isLoggedIn;
    },
  },
  data() {
    return {
      showLogIn: false,
      showSignup: false,
    };
  },
  methods: {
    handleClick() {
      this.$refs.name.classList.add("active");
      this.$refs.name.focus();
    },
    toggleLogIn() {
      console.log("LogIn toggled");
      this.showLogIn = !this.showLogIn;
      if (this.showSignup) {
        this.showSignup = !this.showSignup;
      }
    },
    toggleSignup() {
      console.log("signup toggled");
      this.showSignup = !this.showSignup;
      if (this.showLogIn) {
        this.showLogIn = !this.showLogIn;
      }
    },
    logOut() {
      store.dispatch("logout");
      console.log("reloading");
      window.location.reload();
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  display: flex;
  justify-content: space-between;
  background: #555151;
  padding: 0 20px;
}

body {
  margin: 0;
}

nav a {
  font-weight: bold;
  color: white;
  vertical-align: center;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #ff0000;
}

#logo {
  width: 30%;
  padding: 10px 0;
}
.links {
  align-items: center;
  display: flex;
  justify-content: space-around;
}
footer {
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
