<template>
  <div id="Home2">
    <MapList :displayFavorite="displayFavorite"></MapList>
    <Post v-if="admin"></Post>
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from "@/components/LogIn.vue";
import Post from "@/components/Post.vue";
import MapList from "@/components/MapList.vue";

export default {
  name: "Home",
  data() {
    return {
      displayFavorite: false,
    };
  },
  components: {
    LogIn,
    Post,
    MapList,
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

/* Styles pour le footer */
footer {
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
