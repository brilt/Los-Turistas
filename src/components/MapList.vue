<template>
  <div class="container">
    <GMapMap
      :center="center"
      :zoom="5"
      class="column"
      :options="{
        disableDefaultUi: true,
        streetViewControl: false
      }"
      style="border: 1px solid black"
    >
      <GMapMarker
        :key="lugar.Id"
        v-for="lugar in filterList"
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
      <select v-model="filter">
        <option value="">Tout</option>
        <option v-for="region in uniqueRegion" :key="region" :value="region">
          {{ region }}
        </option>
        <option value="fav">Order by number favorites</option>
      </select>
      <div class="list">
        <article v-for="lugar in shortList()" :key="lugar.Id" class="card">
          <img :src="lugar.Imagen" style="height: 10rem; width: auto" />
          <div class="description">
            <h2>
              {{ lugar.Nombre }}
              <picture>
                <img
                  @click="toggleFavo(lugar)"
                  :src="
                    lugar.isFav
                      ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png'
                      : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png'
                  "
                  style="width: 1em; vertical-align: middle"
                />
                <p style="display:inline; font-size: 0.7em;">({{ lugar.count }})</p>
              </picture>
            </h2>
            <p>
              {{ lugar.Descripción }}
            </p>
            <a :href="lugar.Enlace" target="_blank">Read all about it</a>
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
      tailleAffichage: 3,
      openSpec: false,
      openedMarkerID: null,
      filter: "",
      connectedUser: "",
      currentFav: false,
      favList: [],
      region: [],
      favCount: [],
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
      console.log(data);

      const favCountResponse = await fetch(
        "https://los-turistas-ws.onrender.com/api/orderFav"
      )
        .then((response) => response.json())
        .then((dt) => {
          data.forEach((element) => {
            const matchingElement = dt.find((e) => e.IdLugar === element.Id);
            if (matchingElement) {
              // If a matching element is found in list2, update the properties in list1
              Object.assign(element, matchingElement);
            } else {
              element.count = 0;
            }
          });
        });

      console.log(data);
      this.lugares = data;
    } catch (err) {
      console.log(err.message);
    }
  },

  computed: {
    filterList: function () {
      let region = this.filter;
      this.resetIndex();
      if (this.displayFavorite) {
        return this.favList.filter(function (lugar) {
          let filtered = true;
          if (region && region.length > 0) {
            filtered = lugar.Región === region;
          }
          return filtered;
        });
      } else {
        let filteredList = this.lugares.filter(function (lugar) {
          let filtered = true;
          if (region && region.length > 0) {
            if (region !== "fav") {
              filtered = lugar.Región === region;
            } else {
              filtered = true; // no filtering by "fav" region
            }
          }
          return filtered;
        });

        // sorting by the "count" parameter if no region is specified
        if (region == "fav") {
          filteredList.sort(function (a, b) {
            return b.count - a.count;
          });
        }

        return filteredList;
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
      let id = this.openedMarkerID;
      if (this.openedMarkerID == null) {
        return this.filterList.slice(
          this.indexPage - 1,
          this.indexPage + this.tailleAffichage - 1
        );
      } else {
        return this.lugares.filter(function (lugar) {
          let filtered = true;
          console.log(id);
          filtered = lugar.Id == id;

          return filtered;
        });
      }
    },
    pageSuivante() {
      console.log(
        "this.filterList.length / this.indexPage: " +
          this.filterList.length / this.indexPage
      );
      console.log(" this.tailleAffichage: " + this.tailleAffichage);
      if (
        this.filterList.length / this.indexPage > this.tailleAffichage &&
        this.filterList.length / this.indexPage >= 1
      ) {
        this.indexPage = this.indexPage + this.tailleAffichage;
      }
    },
    pagePrecedente() {
      if (this.indexPage > 1) {
        this.indexPage = this.indexPage - this.tailleAffichage;
      }
    },
    resetIndex() {
      this.indexPage = 1;
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
          if (lugar.isFav) {
            lugar.count ++
          } else {
            lugar.count --
          }
        }
      } catch (error) {
        console.log("Error adding fav: " + error);
      }
    },
    openMarker(id) {
      this.openedMarkerID = id;
      console.log(this.openedMarkerID);
    },
  },
};
</script>
