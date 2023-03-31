<template>
  <div id="Home2">
    <div class="container">
      <GMapMap :center="center" :zoom="5" class="column" style="height: 600px; border: 1px solid black">
        <GMapMarker
          :key="lugar.Id"
          v-for="lugar in lugares"
          :position="{ lat: lugar.Latitud, lng: lugar.Longitud }"
          :clickable="true"
          @click="openMarker(lugar.Id)"
        >
          <GMapInfoWindow
            :closeclick="true"
            @closeclick="openMarker(null)"
            :opened="openedMarkerID === lugar.Id"
          >
            <h2>{{ lugar.Nombre }}</h2>
            <p>
              {{ lugar.Descripción }}
            </p>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>

      <div class="column">
        <select v-model="regionSelected">
          <option value="">Tout</option>
          <option value="Pays de la Loire">Pays de la Loire</option>
          <option value="Occitanie">Occitanie</option>
          <option>C</option>
        </select>
        <div>
          <article v-for="lugar in shortList()" :key="lugar.Id" class="card">
            <img :src="lugar.Imagen" style="height: 10rem; width: auto; max-width: 200px;"/>
            <div class="description">
              <h2>
                {{ lugar.Nombre }}
                <img
                  @click="toggleFavo(lugar)"
                  :src="
                    lugar.fav
                      ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png '
                      : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png '
                  "
                  style="width: 1em"
                />
              </h2>
              <p>
                {{ lugar.Descripción }}
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
      <Post v-if="admin"></Post>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from "@/components/LogIn.vue";
import Post from "@/components/Post.vue";
import store from "../store"


export default {
  name: "Home",
  components: {
    LogIn,
    Post
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
      tailleAffichage: 3,
      openSpec: false,
      openedMarkerID: null,
      regionSelected: "",
    };
  },
  mounted() {
    fetch("https://los-turistas-ws.onrender.com/api/lugares")
      .then((res) => res.json())
      .then((data) => (this.lugares = data))
      .catch((err) => console.log(err.message));
  },
  computed: {
    filterByRegion: function () {
      let region = this.regionSelected;
      this.resetIndex();
      return this.lugares.filter(function (lugar) {
        let filtered = true;
        if (region && region.length > 0) {
          filtered = lugar.Región == region;
        }
        return filtered;
      });
    },
    admin() {
      return store.getters.currentUser.email==="killianboisseau85@gmail.com";
    }
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
    toggleFavo(lugar) {
      console.log("Favorited Toggled");
      lugar.fav = !lugar.fav;
      console.log(lugar);
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
  grid-template-columns: 1fr 2fr;
  padding: 0px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 100%;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
}


.description {
  flex: 1;
}

img {
  width: 100%;
  height: auto;
}

/* Styles pour les colonnes */
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2%;
  flex-wrap: wrap;
  max-width: 90%;
  margin: auto;
  padding: 1%;
} 

.column {
  flex: 1;
  height: auto;
  margin: 5px;
  padding: 10px;

}

/* Styles pour le footer */
footer {
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
