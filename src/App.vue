<template>
  <nav>
    <div class="links">
      <img id="logo" src="./assets/images/los-turistas-logo.png" alt="" />
      <router-link to="/">Página Principal</router-link>
      <router-link to="/favoritos">Favoritos</router-link>
    </div>

    <button v-if="isLoggedIn" class="login" @click="logOut">Hola {{ username }}, click to logout</button>
    <button v-else class="login" @click="toggleLogIn">Iniciar sesión</button>
  </nav>
  <LogIn @close="toggleLogIn" v-if="showLogIn" style="z-index: 1000" />

  <router-view />
</template>

<script>
import LogIn from "./components/LogIn.vue";
import Post from "./components/Post.vue";

import store from './store'

export default {
  components: {
    LogIn,
    Post,
  },
  computed: {
    isLoggedIn() {
      return store.getters.isLoggedIn;
    },
    username() {
      return store.getters.currentUser.username;
    }
  },
  data() {
    return {
      showLogIn: false,
    };
  },
  methods: {
    handleClick() {
      this.$refs.name.classList.add("active");
      this.$refs.name.focus();
    },
    toggleLogIn() {
      this.showLogIn = !this.showLogIn;
    },
    logOut() {
      store.dispatch("logout");
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

button {
  margin: 30px 0;
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
</style>
