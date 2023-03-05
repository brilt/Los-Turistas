<template>
  <nav>
    <div class="links">
      <img id="logo" src="./assets/images/los-turistas-logo.png" alt="" />
      <router-link to="/">Página Principal</router-link>
      <router-link to="/home2">Página Principal2</router-link>
      <router-link to="/favoritos">Favoritos</router-link>
    </div>

    <button class="login" @click="toggleLogIn">Iniciar sesión</button>
  </nav>
  <LogIn @close="toggleLogIn" v-if="showLogIn" />
  
  <router-view />
</template>

<script>
import LogIn from "./components/LogIn.vue";

export default {
  components: {
    LogIn,
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
  },
};
</script>

<style >
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
