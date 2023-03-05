<template>
  <div id="app">
    <div class="container">
      <div class="column">
        <div id="map" style="height: 100%"></div>
      </div>
      <div class="column">
        <h1>Contenu droit</h1>
        <div class="list">
          <article v-for="lugar in lugares" :key="lugar.id" class="card">
            <img :src="lugar.image" />
            <div class="description">
              <h2>{{ lugar.nom }}</h2>
              <p>
                {{ lugar.description }}
              </p>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio"
                >Read all about it</a
              >
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from "@/components/LogIn.vue";

export default {
  name: "Home",
  components: {
    LogIn,
  },
  data() {
    return {
      lugares: [],
    };
  },
  mounted() {
    fetch("http://localhost:3000/lugares")
      .then((res) => res.json())
      .then((data) => (this.lugares = data))
      .catch((err) => console.log(err.message));
  },
};
</script>
<style>
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 25rem;
}

.description {
  flex: 1;
}
img {
  width: 100%;
  height: auto;
  margin-right: 20px;
}

/* Styles pour les colonnes */
.container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  /* les deux colonnes prennent respectivement 2/3 et 1/3 de la largeur */
  grid-gap: 2%;
  /* espace entre les deux colonnes */
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 auto;
  padding: 2%;
}

.column {
  flex: 1;
  height: 500px;
  margin: 10px;
  padding: 20px;
  border: 1px solid #333;
}

/* Styles pour le footer */
footer {
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
