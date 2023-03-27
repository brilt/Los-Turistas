<template>
  <div class="container">
    <GMapMap
      :center="center"
      :zoom="5"
      class="column"
      :options="{
        disableDefaultUi: true,
      }"
    >
      <GMapMarker
        :key="lugar.Id"
        v-for="lugar in filterByRegion"
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
        <option v-for="region in uniqueRegion" :key="region" :value="region">
          {{ region }}
        </option>
      </select>
      <div class="list">
        <article v-for="lugar in shortList()" :key="lugar.Id" class="card">
          <img :src="lugar.Imagen" style="height: 10rem; width: auto" />
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
  </div>
</template>

<script>
import store from "../store";
import FavServices from "@/services/FavServices";

export default {
  name: "MapList",
  props: {
    displayFavorite: {
      type: Boolean,
      required: true,
    },
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
      favList: [],
      region: [],
    };
  },
  async created() {
    this.connectedUser = store.getters.currentUser;
    try {
      const response = await fetch(
        "https://los-turistas-ws.onrender.com/api/lugares"
      );
      const data = await response.json();
      for (const lugar of data) {
        try {
          if (typeof this.connectedUser.id === "undefined") {
            const checklink = {
              IdUsuario: "",
              IdLugar: lugar.Id,
            };
            lugar.isFav = false;
          } else {
            const checklink = {
              IdUsuario: this.connectedUser.id,
              IdLugar: lugar.Id,
            };
            const response = await FavServices.checkFav(checklink);
            if (response.favorito) {
              lugar.isFav = true;
              this.favList.push(lugar);
            } else {
              lugar.isFav = false;
            }
          }
          this.region.push(lugar.Región);
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
      if (this.displayFavorite) {
        return this.favList.filter(function (lugar) {
          let filtered = true;
          if (region && region.length > 0) {
            filtered = lugar.Región == region;
          }
          return filtered;
        });
      } else {
        return this.lugares.filter(function (lugar) {
          let filtered = true;
          if (region && region.length > 0) {
            filtered = lugar.Región == region;
          }
          return filtered;
        });
      }
    },
    admin() {
      return this.connectedUser.email === "killianboisseau85@gmail.com";
    },
    uniqueRegion() {
      let elementsUniques = [];
      for (let i = 0; i < this.region.length; i++) {
        if (elementsUniques.indexOf(this.region[i]) === -1) {
          elementsUniques.push(this.region[i]);
        }
      }
      return elementsUniques;
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
            return true;
          } else {
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

        if (typeof this.connectedUser.id === "undefined") {
          alert("Please log in to add in favorite");
        } else {
          const response = await FavServices.toggleFav(link);

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

<style scoped>
.card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 10px;
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
  margin: auto;
  padding: 2%;
}

.column {
  flex: 1;
  height: auto;
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
