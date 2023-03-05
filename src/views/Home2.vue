<template>
  <div id="Home2">
    <div class="container">
      <GMapMap :center="center" :zoom="5" class="column">
        <GMapMarker
          :key="lugar.id"
          v-for="lugar in lugares"
          :position="{ lat: lugar.latitude, lng: lugar.longitude }"
          :clickable="true"
          @click="openMarker(lugar.id)"
        >
          <GMapInfoWindow
            :closeclick="true"
            @closeclick="openMarker(null)"
            :opened="openedMarkerID === lugar.id"
          >
            <h2>{{ lugar.nom }}</h2>
            <p>
              {{ lugar.description }}
            </p>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>

      <div class="column">
        <h1>Contenu droit</h1>
        <select v-model="regionSelected" >
          <option value="">Tout</option>
          <option value="Pays de la Loire">Pays de la Loire</option>
          <option value="Occitanie">Occitanie</option>
          <option>C</option>
        </select>
        <div class="list">
          <article
            v-for="lugar in shortList()"
            :key="lugar.id"
            class="card"
          >
            <img :src="lugar.image" />
            <div class="description">
              <h2>
                {{ lugar.nom }}
                <img
                  @click="toggleFavo"
                  src="../assets/icons/heart-empty.png"
                  style="width: 1em"
                />
              </h2>
              <p>
                {{ lugar.description }}
              </p>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio"
                >Read all about it</a
              >
            </div>
          </article>
          <button @click="pageSuivante">Page suivante</button>
          <button @click="pagePrecedente">Page Précédente</button>
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
      center: { lat: 46.447898, lng: 2.554401 },
      markers: [
        {
          position: {
            lat: 51.093048,
            lng: 6.84212,
          },
        },
      ],
      indexPage: 0,
      tailleAffichage: 2,
      openSpec: false,
      openedMarkerID: null,
      regionSelected: "",
    };
  },
  mounted() {
    fetch("http://localhost:3000/lugares")
      .then((res) => res.json())
      .then((data) => (this.lugares = data))
      .catch((err) => console.log(err.message));
  },
  computed: {
    filterByRegion: function () {
      
      let region = this.regionSelected
      this.resetIndex()
      return this.lugares.filter(function (lugar) {
        let filtered = true;
        if (region && region.length > 0) {
          filtered = lugar.region == region;
        }
        return filtered
      });
    },
  },
  methods: {
    shortList() {
      return this.filterByRegion.slice(
        this.indexPage,
        this.indexPage + this.tailleAffichage
      );
    },
    pageSuivante() {
      if (this.filterByRegion.length / this.indexPage > this.tailleAffichage) {
        this.indexPage = this.indexPage + this.tailleAffichage;
      }
    },
    pagePrecedente() {
      if (this.indexPage > 0) {
        this.indexPage = this.indexPage - this.tailleAffichage;
      }
    },
    resetIndex() {
      this.indexPage = 0;
    },
    toggleFavo() {
      console.log("Favorited Toggled");
    },
    openMarker(id) {
      this.openedMarkerID = id;
    },
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
