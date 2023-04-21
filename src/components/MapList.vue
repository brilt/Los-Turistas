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
        
        v-for="place in filterList"
        :key="place.Id"
        :position="{ lat: place.Latitude, lng: place.Longitud }"
        :clickable="true"
        @click="openMarker(place.Id)"
      >
        <GMapInfoWindow
          :closeclick="true"
          @closeclick="openMarker(null)"
          :opened="openedMarkerID === place.Id"
        >
          <h2>{{ place.Name }}</h2>
          <p>
            {{ place.Description }}
          </p>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>

    <div class="column">
      <select v-model="filter">
        <option value="">Tout</option>
        <option v-for="region in uniqueRegion" :key="region" :value="region">
          {{ region }}
        </option>
        <option value="fav">Order by number favorites</option>
      </select>
      <div class="list">
        <article v-for="place in shortList()" :key="place.Id" class="card">
          <picture style="position: absolute; top: 0; right: 0; margin: 15px;">
                <img @click="toggleFavo(place)" :src="
                  place.isFav
                    ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png'
                    : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png'
                " style="width: 1.5em; " />
                <p style="display:inline; font-size: 1em;">({{ place.count }})</p>
              </picture>
          <img :src="place.Image" style="height: 10rem; width: auto" />
          <div class="description">
            <h2>
              {{ place.Name }}
            </h2>
            <p>
              {{ place.Description }}
            </p>
            <a :href="place.Link" target="_blank">Read all about it</a>
          </div>
        </article>

        <button @click="previousPage">Previous page</button>
        <button @click="nextPage">Next page</button>
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
      places: [],
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
      displaySize: 3,
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
        "https://los-turistas-ws.onrender.com/api/places"
      );
      const data = await response.json();
      for (const place of data) {
        try {
          if (typeof this.connectedUser.id === "undefined") {
            const checklink = {
              userId: "",
              placeId: place.Id,
            };
            place.isFav = false;
          } else {
            const checklink = {
              userId: this.connectedUser.id,
              placeId: place.Id,
            };
            const response = await FavServices.checkFav(checklink);
            if (response.favorite) {
              place.isFav = true;
              this.favList.push(place);
            } else {
              place.isFav = false;
            }
          }
          this.region.push(place.Region);
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
            const matchingElement = dt.find((e) => e.placeId === element.Id);
            if (matchingElement) {
              // If a matching element is found in list2, update the properties in list1
              Object.assign(element, matchingElement);
            } else {
              element.count = 0;
            }
          });
        });

      this.places = data;
    } catch (err) {
      console.log(err.message);
    }
  },

  computed: {
    filterList: function () {
      let region = this.filter;
      this.resetIndex();
      if (this.displayFavorite) {
        return this.favList.filter(function (place) {
          let filtered = true;
          if (region && region.length > 0) {
            filtered = place.Region === region;
          }
          return filtered;
        });
      } else {
        let filteredList = this.places.filter(function (place) {
          let filtered = true;
          if (region && region.length > 0) {
            if (region !== "fav") {
              filtered = place.Region === region;
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
      let uniqueElements = [];
      for (let i = 0; i < this.region.length; i++) {
        if (uniqueElements.indexOf(this.region[i]) === -1) {
          uniqueElements.push(this.region[i]);
        }
      }
      return uniqueElements;
    },
  },
  methods: {
    checkfavorite(place) {
      try {
        const checklink = {
          userId: this.connectedUser.id,
          placeId: place.Id,
        };
        if (typeof this.connectedUser.id === "undefined") {
        } else {
          const response = FavServices.checkFav(checklink);
          if (response.favorite) {
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
          this.indexPage + this.displaySize - 1
        );
      } else {
        return this.places.filter(function (place) {
          let filtered = true;
          console.log(id);
          filtered = place.Id == id;

          return filtered;
        });
      }
    },
    nextPage() {
      console.log(
        "this.filterList.length / this.indexPage: " +
        this.filterList.length / this.indexPage
      );
      console.log(" this.displaySize: " + this.displaySize);
      if (
        this.filterList.length / this.indexPage > this.displaySize &&
        this.filterList.length / this.indexPage >= 1
      ) {
        this.indexPage = this.indexPage + this.displaySize;
      }
    },
    previousPage() {
      if (this.indexPage > 1) {
        this.indexPage = this.indexPage - this.displaySize;
      }
    },
    resetIndex() {
      this.indexPage = 1;
    },
    async toggleFavo(place) {
      try {
        const link = {
          userId: this.connectedUser.id,
          placeId: place.Id,
        };

        if (typeof this.connectedUser.id === "undefined") {
          alert("Please log in to add in favorite");
        } else {
          const response = await FavServices.toggleFav(link);

          place.isFav = response.isFav;
          if (place.isFav) {
            place.count ++
          } else {
            place.count --
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
<style>
.card {
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 0px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 100%;
  position:relative;
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
</style>