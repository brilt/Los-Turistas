<template>
  <div class="list">
    <article v-for="lugar in lugares" :key="lugar.id" class="cta">
      <img :src="lugar.image" />
      <div class="cta__text-column">
        <h2>{{ lugar.nom }}</h2>
        <p>
          {{ lugar.description }}
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio"
          >Read all about it</a
        >
      </div>
    </article>
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

.list {
	font-family: "Open Sans", sans-serif;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
	gap: 2rem;
	justify-content: center;
	align-items: center;
	background: hsl(187 40% 98%);
}


img {
  display: block;
  width: 100%;
}

h2 {
  margin: 0;
  font-size: 1.4rem;
}

@media (min-width: 50em) {
  h2 {
    font-size: 1.8rem;
  }
}

.cta {
  --shadowColor: 187 60% 40%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row; /* mise à jour de la direction de la flexbox */
  background: hsl(187 70% 85%);
  max-width: 25rem;
  width: 100%;
  box-shadow: 0.65rem 0.65rem 0 hsl(var(--shadowColor) / 1);
  border-radius: 0.8rem;
  overflow: hidden;
  border: 0.5rem solid;
  align-items: center; /* ajout de l'alignement vertical au centre */
}

.cta img {
  aspect-ratio: 3 / 2;
  object-fit: cover;
  flex: 1 1 300px;
  outline: 0.5rem solid;
}

.cta__text-column {
  padding: min(2rem, 5vw) min(2rem, 5vw) min(2.5rem, 5vw);
  flex: 1 0 50%;
}

.cta__text-column > * + * {
  margin: min(1.5rem, 2.5vw) 0 0 0;
}

.cta a {
  display: inline-block;
  color: black;
  padding: 0.5rem 1rem;
  text-decoration: none;
  background: hsl(187 75% 64%);
  border-radius: 0.6rem;
  font-weight: 700;
  border: 0.35rem solid;
}
</style>
