<template>
  <div id="Favorites">
    <MapList :displayFavorite=displayFavorite></MapList>
  </div>
</template>

<script>
// @ is an alias to /src
import LogIn from "@/components/LogIn.vue";
import MapList from "@/components/MapList.vue";


export default {
  name: "Favorite",
  data() {
    return {
      displayFavorite: true,
    }
  },
  components: {
    LogIn,
    MapList
  },
};
</script>
<style>


</style>
