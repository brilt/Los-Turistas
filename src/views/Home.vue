<template>
  <div id="Home2">
    <div class="container">
      <GMapMap :center="center" :zoom="5" class="column">
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
        <h1>Contenu droit</h1>
        <select v-model="regionSelected">
          <option value="">Tout</option>
          <option value="Pays de la Loire">Pays de la Loire</option>
          <option value="Occitanie">Occitanie</option>
          <option>C</option>
        </select>
        <div class="list">
          <article v-for="lugar in shortList()" :key="lugar.Id" class="card">
            <img :src="lugar.Imagen" />
            <div class="description">
              <h2>
                {{ lugar.Nombre }}
                <img
                  @click="toggleFavo(lugar)"
                  :src="
                    lugar.isFav
                      ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png'
                      : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png'
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

          <button @click="pagePrecedente">Page Précédente</button>
          <button @click="pageSuivante">Page suivante</button>
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
import FavServices from "@/services/FavServices";
import store from "../store";

export default {
  name: "Home",
  components: {
    LogIn,
    Post,
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
      connectedUser: "",
      currentFav: false,
    };
  },
  async created() {
    this.connectedUser = store.getters.currentUser;
    console.log("CONNECTED USER: " + this.connectedUser);
    try {
      const response = await fetch("http://localhost:8000/api/lugares");
      const data = await response.json();
      for (const lugar of data) {
        try {
          if (typeof this.connectedUser.id === "undefined") {
            console.log("No user connected.");
            const checklink = {
              IdUsuario: "",
              IdLugar: lugar.Id,
            };
            lugar.isFav = false;
            console.log("PAS FAVORI");
            console.log(lugar.isFav);
          } else {
            const checklink = {
              IdUsuario: this.connectedUser.id,
              IdLugar: lugar.Id,
            };
            const response = await FavServices.checkFav(checklink);
            if (response.favorito) {
              console.log("FAVORI");
              lugar.isFav = true;
              console.log(lugar.isFav);
            } else {
              console.log("PAS FAVORI");
              lugar.isFav = false;
            }
          }
        } catch (error) {
          console.log("Error checking fav: " + error);
        }
      }
      this.lugares = data;
    } catch (err) {
      console.log(err.message);
    }
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
      return this.connectedUser.email === "killianboisseau85@gmail.com";
    },
  },
  methods: {
    checkFavorito(lugar) {
      try {
        const checklink = {
          IdUsuario: this.connectedUser.id,
          IdLugar: lugar.Id,
        };
        if (typeof this.connectedUser.id === "undefined") {
        } else {
          const response = FavServices.checkFav(checklink);
          if (response.favorito) {
            console.log("FAVORI");
            return true;
          } else {
            console.log("PAS FAVORI");
            return false;
          }
        }
      } catch (error) {
        console.log("Error checking fav: " + error);
      }
    },
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
    async toggleFavo(lugar) {
      try {
        const link = {
          IdUsuario: this.connectedUser.id,
          IdLugar: lugar.Id,
        };
        console.log("CLICKED");

        if (typeof this.connectedUser.id === "undefined") {
        } else {
          const response = await FavServices.toggleFav(link);

          console.log("is fav ? " + response.isFav);
          lugar.isFav = response.isFav;
        }
      } catch (error) {
        console.log("Error adding fav: " + error);
      }
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
  grid-template-columns: 1fr 1fr;
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
