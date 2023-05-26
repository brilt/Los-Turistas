<template>
  <div class="container">
    <GMapMap :center="center" :zoom="5" :class="{ 'map-pc': !isMobile, 'map-mobile': isMobile }" :style="{ minHeight: '500px' }">
      <GMapMarker v-for="place in filterList" :key="place.Id" :position="{ lat: place.Latitude, lng: place.Longitud }"
        :clickable="true" @click="openMarker(place.Id)">
        <GMapInfoWindow :closeclick="true" @closeclick="openMarker(null)" :opened="openedMarkerID === place.Id">
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
          <div id="img-container"><img :src="place.Image" /></div>
          <div>

            <div class="description">
              <div class="desc_title">
                <h2> {{ place.Name }} </h2>
                <picture>
                  <img @click="toggleFavo(place)" :src="place.isFav
                    ? 'https://cdn-icons-png.flaticon.com/512/833/833472.png'
                    : 'https://cdn-icons-png.flaticon.com/512/1077/1077035.png'
                    " style="width: 1.5em; " />
                  <p style="display:inline; font-size: 1em;">({{ place.count }})</p>
                </picture>
              </div>
              <p>
                {{ place.Description }}
              </p>
              <a :href="place.Link" target="_blank">Read all about it</a>
            </div>
          </div>
        </article>

        <button @click="previousPage" id="prvP">Previous page</button>
        <button @click="nextPage" id="nxtP">Next page</button>
      </div>
    </div>
  </div>
  <Post v-if="admin"></Post>
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
        console.log("display favorite");
        return this.favList.filter(function (place) {
          let filtered = true;
          if (region && region.length > 0) {
            filtered = place.Region === region;
          }
          return filtered;
        });
      } else {
        if (region !== "fav") {
          return this.places.filter(function (place) {
            let filtered = true;
            if (region && region.length > 0) {
              filtered = place.Region === region;
            }
            return filtered;
          });
        } else {
          return this.places.sort(function (a, b) {
            return b.count - a.count;
          });
        }

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
      console.log("length: " + this.filterList.length);
      if (this.openedMarkerID == null) {
        return this.filterList.slice(
          this.indexPage - 1,
          this.indexPage + this.displaySize - 1
        );
      } else {
        return this.places.filter(function (place) {
          let filtered = true;

          filtered = place.Id == id;

          return filtered;
        });
      }
    },
    nextPage() {
      let listSize = this.filterList.length;
      if (
        this.filterList.length / this.indexPage > 1 &&
        this.indexPage + this.displaySize <= this.filterList.length
      ) {
        this.indexPage = this.indexPage + this.displaySize;
        document.getElementById("prvP").disabled = false;
      } else {
        document.getElementById("nxtP").disabled = true;
      }
    },
    previousPage() {
      if (this.indexPage > 1) {
        this.indexPage = this.indexPage - this.displaySize;
      } else {
        document.getElementById("prvP").disabled = true;
      }
      if (document.getElementById("nxtP").disabled == true) {
        document.getElementById("nxtP").disabled = false;
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
            place.count++;
          } else {
            place.count--;
          }
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
  grid-template-columns: 1fr 2fr;
  padding: 0px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-width: 100%;
  position: relative;
}

.desc_title {
  display: grid;
  grid-template-columns: 4fr 1fr;
}

.card>img {
  height: 10rem;
  width: auto;
}

.description {
  flex: 1;
}

img {
  width: 100%;
  height: auto;
  vertical-align: middle;
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

.map-pc {
  min-height: 500px;
}

.map-mobile {
  min-height: 300px;
}

button {
  background-color: #e0e0e0;
  border: none;
  color: #333;
  padding: 7px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 100%;
  margin: 4px 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #d3d1d1;
}

picture {
  position: absolute;
  top: 0;
  right: 0;
  margin: 15px;
}

#img-container{
  margin: auto;
}

@media screen and (max-width: 767px) {
  .container {
    display: flex;
    flex-direction: column;
  }


  .card > img {
    height: 5rem;
    width: auto;
  }

  picture {
    position: relative;
    top: 0;
    right: 0;
    margin: 15px;
  }

  .card {
    display: flex;
    flex-direction: column;
    grid-template-rows: 1fr 2fr;
    padding: 0px;
    margin: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    max-width: 100%;
    position: relative;
  }

  .card div:first-child {
    order: 1;
  }

  .card div:last-child {
    order: 2;
  }
}
</style>
